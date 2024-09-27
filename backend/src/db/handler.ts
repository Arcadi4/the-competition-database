import mongoose, { Document } from "mongoose";
import { mongodbUrl } from "../config.json";
import { importByCsv } from "./importByCsv";
import { Event, PendingApprovalEvent } from "./schemas";

export class DBHandler {
    private static _instance: DBHandler;

    private constructor() {
        this.connectToDatabase();
        importByCsv();
    }

    public static getInstance() {
        if (!this._instance) {
            this._instance = new DBHandler();
        }
        return this._instance;
    }

    public async addEventFromJson(event: JSON): Promise<Document> {
        return new Event(event).save();

        // TODO: Switch to this when implementing approval
        // return new PendingApprovalEvent(event).save();
    }

    public async approveEventById(id: string): Promise<Document | null> {
        const event = await PendingApprovalEvent.findById(id);
        if (!event) {
            return null;
        }
        const approvedEvent = new Event(event);
        await approvedEvent.save();
        await PendingApprovalEvent.deleteOne({ _id: id });
        return approvedEvent;
    }

    private async connectToDatabase() {
        await mongoose.connect(mongodbUrl);
    }
}
