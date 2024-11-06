import mongoose, { Schema } from "mongoose";

const urlRegex =
    /^(?:(http|https|ftp):\/\/)?((|[\w-]+\.)+[a-z0-9]+)(?:(\/[^/?#]+)*)?(\?[^#]+)?(#.+)?$/i;

const tags = ["Null"];

const eventSchema = new Schema({
    title: { type: String, required: true, trim: true },
    briefDescription: { type: String, required: true, trim: true },
    longDescription: { type: String, required: true, trim: true },
    tags: { type: [String], enum: tags },
    timestamp: { type: Date, required: true, default: Date.now },
    sharepointLinks: { type: [String], match: urlRegex },
});

export const Event = mongoose.model("Event", eventSchema);
export const PendingApprovalEvent = mongoose.model(
    "PendingApprovalEvent",
    eventSchema
);
