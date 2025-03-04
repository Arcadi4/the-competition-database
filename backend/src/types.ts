import mongoose from "mongoose";

export interface IFrontendEvent {
    title: string;
    briefDescription: string;
    longDescription: string;
    tags: string[];
    timestamp: number;
    sharepointLinks: string[];
}

export interface IEventData {
    title: string;
    briefDescription: string;
    longDescription: string;
    tags: string[];
    timestamp: Date;
    sharepointLinks: string[];
}

export interface IMessage {
    type: "success" | "info" | "warning" | "error";
    content: string;
}

export enum EventTags {
    "Tag 1",
    "Tag 2",
    "Tag 3",
    "Tag 4",
    "Tag 5",
}

export type EventId = string | mongoose.Types.ObjectId;
