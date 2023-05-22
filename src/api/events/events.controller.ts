import { EventsService } from "./events.service";
import {
  ICreateEventRequest,
  IGetAllEventsRequest,
  IUpdateEventRequest,
} from "./interfaces/event-request-interfaces";
import { ResponseToolkit } from "@hapi/hapi";
import { IdParamRequest } from "../../common/interface";

export class EventsController {
  private readonly eventsService: EventsService;

  constructor() {
    this.eventsService = new EventsService();
  }

  async getAll(request: IGetAllEventsRequest, h: ResponseToolkit) {
    const events = await this.eventsService.getAll(request.query);

    return h.response(events);
  }

  async createEvent(request: ICreateEventRequest, h: ResponseToolkit) {
    const event = await this.eventsService.create(request.payload);
    return h.response(event);
  }

  async updateEvent(request: IUpdateEventRequest, h: ResponseToolkit) {
    const updatedEvent = await this.eventsService.update(
      request.params.id,
      request.payload
    );

    return h.response(updatedEvent);
  }

  async deleteOne(request: IdParamRequest, h: ResponseToolkit) {
    const deletedEvent = await this.eventsService.softDelete(request.params.id);
    return h.response(deletedEvent);
  }

  async recoverOne(request: IdParamRequest, h: ResponseToolkit) {
    const recoveredEvent = await this.eventsService.recoverOne(
      request.params.id
    );
    return h.response(recoveredEvent);
  }
}
