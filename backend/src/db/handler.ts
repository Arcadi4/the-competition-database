import mongoose from "mongoose";
import { mongodbUrl } from "../config.json";
import { Event, PendingApprovalEvent } from "./schemas";

export class DBHandler {
    private static _instance: DBHandler;

    private constructor() {
        mongoose.connect(mongodbUrl).catch((err) => {
            throw err;
        });
    }

    public static getInstance() {
        if (!this._instance) {
            this._instance = new DBHandler();
        }
        return this._instance;
    }

    // public async getNodeById(id: string): Promise<JSON | null> {
    //     return mongoose.model("nodes").findById(id);
    // }

    public async getEventById(id: string): Promise<JSON | null> {
        return mongoose.model("events").findById(id);
    }

    public async getEventByName(name: string): Promise<JSON[] | null> {
        return mongoose.model("events").find({ title: name });
    }

    public async addPendingApprovalEvent(event: JSON): Promise<string> {
        const newEvent = new PendingApprovalEvent(event);
        await newEvent.save();
        return newEvent.id;
    }

    public async approveEvent(id: string): Promise<string | null> {
        const event = await PendingApprovalEvent.findById(id);
        if (!event) {
            return null;
        }
        const newEvent = new Event(event);
        await newEvent.save();
        await PendingApprovalEvent.findByIdAndDelete(id);
        return newEvent.id;
    }
}
