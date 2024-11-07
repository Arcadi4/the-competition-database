export interface IEvent {
    _id: string;
    title: string;
    briefDescription: string;
    longDescription: string;
    tags: string[];
    timestamp: string;
    sharepointLinks: string[];
}

export interface IEventForm {
    title: string;
    briefDescription: string;
    longDescription: string;
    tags: string[];
    timestamp: Date;
    sharepointLinks: string[];
}

export enum EventTags {
    "Tag 1",
    "Tag 2",
    "Tag 3",
    "Tag 4",
    "Tag 5",
}
