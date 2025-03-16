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
    "DEBUG 1",
    "DEBUG 2",
    "DEBUG 3",
    "DEBUG 4",
    "DEBUG 5",
}

export interface IEventSubmission {
    title: string;
    briefDescription: string;
    longDescription: string;
    tags: string[];
    timestamp: number;
}

export interface IEvent {
    _id: string;
    title: string;
    briefDescription: string;
    longDescription: string;
    tags: string[];
    timestamp: string;
    sharepointLinks: string[];
}

export type EventId = string | mongoose.Types.ObjectId;
