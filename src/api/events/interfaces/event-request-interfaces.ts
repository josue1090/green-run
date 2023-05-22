import { BaseRequest } from "../../shared/interfaces/interface";
import { EventFilterParams } from "./event-filter.interface";
import { IEvent } from "./event.interface";

export interface IGetAllEventsRequest extends BaseRequest {
  query: EventFilterParams;
}

export interface ICreateEventRequest extends BaseRequest {
  payload: IEvent;
}

export interface IUpdateEventRequest extends BaseRequest {
  params: {
    id: number;
  };
  payload: Partial<IEvent>;
}
