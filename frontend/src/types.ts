export interface IEvent {
    _id: string;
    title: string;
    briefDescription: string;
    longDescription: string;
    tags: string[];
    timestamp: string;
    sharepointLinks: string[];
}

export interface IEventData {
    title: string;
    briefDescription: string;
    longDescription: string;
    tags: string[];
    timestamp: number;
    sharepointLinks: string[];
}

export enum EventTags {
    "Tag 1",
    "Tag 2",
    "Tag 3",
    "Tag 4",
    "Tag 5",
}

export interface IEventSubmission {
    title: string;
    briefDescription: string;
    longDescription: string;
    tags: string[];
    timestamp: number;
}

// TODO: Implement this type on both frontend and backend
export interface IMessage {
    type: "success" | "info" | "warning" | "error";
    content: string;
}
