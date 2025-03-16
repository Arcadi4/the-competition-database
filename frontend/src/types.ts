import {
    EventTags,
    IEventData,
    IFrontendEvent,
    IMessage,
} from "../../backend/src/shared/types";

export { IFrontendEvent, IEventData, IMessage, EventTags };

export interface IEvent {
    _id: string;
    title: string;
    briefDescription: string;
    longDescription: string;
    tags: string[];
    timestamp: string;
    sharepointLinks: string[];
}

export interface IEventSubmission {
    title: string;
    briefDescription: string;
    longDescription: string;
    tags: string[];
    timestamp: number;
}
