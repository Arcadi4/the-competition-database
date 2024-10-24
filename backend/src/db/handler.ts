import mongoose from "mongoose";
import { Event, PendingApprovalEvent } from "./schemas";

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

    public async getEventById(id: string): Promise<JSON | null> {
        console.log(`Event fetching with id: ${id}`);
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

    public async addPendingApprovalEvent(event: JSON): Promise<string> {
        const newEvent = new PendingApprovalEvent(event);
        await newEvent.save();
        console.log(`Added new pending approval event with id: ${newEvent.id}`);
        return newEvent.id;
    }

    public async approveEvent(id: string): Promise<string | null> {
        const event = await PendingApprovalEvent.findById(id);
        if (!event) {
            return null;
        }
        const newEvent = new Event(event);
        await newEvent.save();
        console.log(`Approved event with id: ${id}`);
        await PendingApprovalEvent.findByIdAndDelete(id);
        return newEvent.id;
    }
}
