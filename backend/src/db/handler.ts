import mongoose from "mongoose";
import { DisposedEvent, Event, PendingApprovalEvent } from "./schemas";
import { IEventData, IFrontendEvent } from "../../../shared/types";
import { EventId } from "../types";

export class DBHandler {
    private static _instance: DBHandler;

    private constructor() {
        const mongoUrl = process.env.MONGODB_URL;
        if (!mongoUrl) {
            throw new Error(
                "MONGODB_URL is not defined in the environment variables"
            );
        }
        mongoose.connect(mongoUrl).catch((err) => {
            throw err;
        });
    }

    public static getInstance() {
        if (!this._instance) {
            this._instance = new DBHandler();
        }
        return this._instance;
    }

    public async getAllEvents(): Promise<JSON[]> {
        console.log("All events fetching");
        return Event.find();
    }

    public async getEventByTimeRange(start: Date, end: Date): Promise<JSON[]> {
        console.log(`Event fetching with start: ${start} and end: ${end}`);
        return Event.find({ timestamp: { $gte: start, $lte: end } });
    }

    // TODO: Implement this function
    // public async getTodayEvents(): Promise<JSON[]> {}

    public async getEventById(id: EventId): Promise<JSON | null> {
        console.log(`Event fetching with id: ${id}`);
        if (!mongoose.isValidObjectId(id)) {
            return null;
        }
        return Event.findById(id);
    }

    public async getPendingApprovalEvents(): Promise<JSON[]> {
        console.log("Pending approval events fetching");
        return PendingApprovalEvent.find();
    }

    public async queryEvents(query: string[]): Promise<JSON[]> {
        console.log(`Event fetching with query: ${query}`);
        return Event.find({
            $or: query.map((keyword) => ({
                $or: [
                    { title: { $regex: keyword, $options: "i" } },
                    { briefDescription: { $regex: keyword, $options: "i" } },
                ],
            })),
        });
    }

    public async addPendingApprovalEvent(
        eventData: IFrontendEvent
    ): Promise<mongoose.Types.ObjectId> {
        const event = this.toEventData(eventData);
        const newEvent = new PendingApprovalEvent(event);
        await newEvent.save();
        console.log(`Added new pending approval event with id: ${newEvent.id}`);
        return newEvent._id;
    }

    public async approveEvent(
        id: EventId
    ): Promise<null | mongoose.Types.ObjectId> {
        try {
            const pendingEvent = await PendingApprovalEvent.findById(id);
            if (!pendingEvent) {
                return null;
            }
            const approvedEvent = new Event(pendingEvent);
            await approvedEvent.save();
            await PendingApprovalEvent.findByIdAndDelete(id);
            console.log(`Approved event with id: ${id}`);
            return approvedEvent._id;
        } catch (error: any) {
            if (error.name === "ValidationError") {
                console.warn("Validation warning approving event:", error);
                return null;
            } else if (error.name === "VersionError") {
                console.error("Version error approving event:", error);
                throw new Error(
                    "Event has been modified by another process. Please try again."
                );
            }
            throw error;
        }
    }

    public async rejectEvent(
        id: EventId
    ): Promise<null | mongoose.Types.ObjectId> {
        try {
            if (!mongoose.isValidObjectId(id)) {
                return null;
            }
            const event = await PendingApprovalEvent.findById(id);
            if (!event) {
                return null;
            }
            const disposedEvent = new DisposedEvent(event);
            await disposedEvent.save();
            await PendingApprovalEvent.findByIdAndDelete(id);
            console.log(`Rejected and moved to trash event with id: ${id}`);
            return disposedEvent._id;
        } catch (error: any) {
            if (error.name === "ValidationError") {
                console.warn("Validation warning rejecting event:", error);
                return null;
            } else if (error.name === "VersionError") {
                console.error("Version error rejecting event:", error);
                throw new Error(
                    "Event has been modified by another process. Please try again."
                );
            }
            throw error;
        }
    }

    public async getRejectedEvents(): Promise<JSON[]> {
        console.log("Rejected events fetching");
        return DisposedEvent.find();
    }

    public async restoreEvent(
        id: EventId
    ): Promise<mongoose.Types.ObjectId | null> {
        try {
            const disposedEvent = await DisposedEvent.findById(id);
            if (!disposedEvent) {
                console.log(`No disposed event found with id: ${id}`);
                return null;
            }
            const restoredEvent = new PendingApprovalEvent(disposedEvent);
            await restoredEvent.save();
            await DisposedEvent.findByIdAndDelete(disposedEvent.id);
            console.log(`Disposed event deleted with id: ${disposedEvent.id}`);
            return restoredEvent._id;
        } catch (error: any) {
            if (error.name === "ValidationError") {
                console.warn("Validation warning restoring event:", error);
                return null;
            } else if (error.name === "VersionError") {
                console.error("Version error restoring event:", error);
                throw new Error(
                    "Event has been modified by another process. Please try again."
                );
            }
            throw error;
        }
    }

    private toEventData(eventData: IFrontendEvent): IEventData {
        return {
            title: eventData.title,
            briefDescription: eventData.briefDescription,
            longDescription: eventData.longDescription,
            tags: eventData.tags,
            timestamp: new Date(eventData.timestamp),
            sharepointLinks: eventData.sharepointLinks,
        };
    }
}
