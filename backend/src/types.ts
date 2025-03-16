import {
    EventTags,
    IEventData,
    IFrontendEvent,
    IMessage,
} from "../../shared/types";
import mongoose from "mongoose";

export { IFrontendEvent, IEventData, IMessage, EventTags };

export type EventId = string | mongoose.Types.ObjectId;
