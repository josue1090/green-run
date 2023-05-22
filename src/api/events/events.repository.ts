import { Brackets, SelectQueryBuilder } from "typeorm";
import AppDataSource from "../../db/data-source";
import Event from "./entities/event.entity";
import { EventFilterParams } from "./interfaces/event-filter.interface";

export const EventsRepository = AppDataSource.getRepository(Event).extend({
  findAll(filter?: EventFilterParams) {
    return this.createQueryBuilder("Events")
      .where((qb: SelectQueryBuilder<Event[]>) => {
        if (filter?.status) {
          qb.andWhere(
            new Brackets((bqb) => {
              bqb.where("Events.status = :status", {
                status: filter.status,
              });
            })
          );
        }
      })
      .getMany();
  },
});
