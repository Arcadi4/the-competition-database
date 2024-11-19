import mongoose from "mongoose";
import { Event, PendingApprovalEvent } from "./schemas";
import { EventId, IEventData, IFrontendEvent } from "../types";

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

    public async queryEvents(query: string): Promise<JSON[]> {
        console.log(`Event fetching with query: ${query}`);
        return Event.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { briefDescription: { $regex: query, $options: "i" } },
                { longDescription: { $regex: query, $options: "i" } },
            ],
        });
    }

    public async addPendingApprovalEvent(
        eventData: IFrontendEvent
    ): Promise<mongoose.Types.ObjectId> {
        const event = this.frontendEventTransform(eventData);
        const newEvent = new PendingApprovalEvent(event);
        await newEvent.save();
        console.log(`Added new pending approval event with id: ${newEvent.id}`);
        return newEvent._id;
    }

    public async approveEvent(
        id: EventId
    ): Promise<mongoose.Types.ObjectId | null> {
        const pendingEvent = await PendingApprovalEvent.findById(id);
        if (!pendingEvent) {
            return null;
        }
        const approvedEvent = new Event(pendingEvent);
        await approvedEvent.save();
        await PendingApprovalEvent.findByIdAndDelete(id);
        console.log(`Approved event with id: ${id}`);
        return approvedEvent._id;
    }

    public async rejectEvent(
        id: EventId
    ): Promise<mongoose.Types.ObjectId | null> {
        if (!mongoose.isValidObjectId(id)) {
            return null;
        }
        const event = await PendingApprovalEvent.findById(id);
        if (!event) {
            return null;
        }
        await PendingApprovalEvent.findByIdAndDelete(id);
        console.log(`Rejected event with id: ${id}`);
        return event._id;
    }

    private frontendEventTransform(eventData: IFrontendEvent): IEventData {
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
