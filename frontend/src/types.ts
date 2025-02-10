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

// TODO: FILL THIS IN
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

// TODO: Implement this type on both frontend and backend
export interface IMessage {
    type: "success" | "info" | "warning" | "error";
    content: string;
}
