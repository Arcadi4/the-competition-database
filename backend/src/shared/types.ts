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
