import * as Boom from "@hapi/boom";

import { EventsRepository } from "./events.repository";
import { IEvent } from "./interfaces/event.interface";
import Event from "./entities/event.entity";
import { EventFilterParams } from "./interfaces/event-filter.interface";

export class EventsService {
  private readonly eventsRepository: typeof EventsRepository;

  constructor() {
    this.eventsRepository = EventsRepository;
  }

  async getAll(filter?: EventFilterParams): Promise<Event[]> {
    return this.eventsRepository.findAll(filter);
  }

  async findById(id: number): Promise<Event> {
    const event = await this.eventsRepository.findOne({ where: { id } });

    if (!event) throw Boom.notFound();

    return event;
  }

  async create(eventPayload: IEvent): Promise<Event> {
    const event = await this.eventsRepository.create(eventPayload);
    return this.eventsRepository.save(event);
  }

  async update(
    id: number,
    updateEventPayload: Partial<IEvent>
  ): Promise<Event> {
    const event = await this.findById(id);
    this.eventsRepository.merge(event, updateEventPayload);
    return event.save();
  }

  async softDelete(id: number): Promise<Event> {
    const event = await this.findById(id);
    return event.softRemove();
  }

  async recoverOne(id: number): Promise<Event> {
    const event = await this.eventsRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!event?.deletedAt) throw Boom.notFound();

    return this.eventsRepository.recover(event);
  }
}
