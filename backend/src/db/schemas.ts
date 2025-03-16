import mongoose, { Schema } from "mongoose";
import { EventTags } from "../shared/types";

const urlRegex =
    /^(?:(http|https|ftp):\/\/)?((|[\w-]+\.)+[a-z0-9]+)(?:(\/[^/?#]+)*)?(\?[^#]+)?(#.+)?$/i;

const eventSchema = new Schema({
    title: { type: String, required: true, trim: true },
    briefDescription: { type: String, required: true, trim: true },
    longDescription: { type: String, required: true, trim: true },
    tags: { type: [String], enum: EventTags },
    timestamp: { type: Date, required: true, default: Date.now },
    sharepointLinks: { type: [String], match: urlRegex },
});

export const Event = mongoose.model("Event", eventSchema);
export const PendingApprovalEvent = mongoose.model(
    "PendingApprovalEvent",
    eventSchema
);
export const DisposedEvent = mongoose.model("DisposedEvent", eventSchema);
