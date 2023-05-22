import { SelectQueryBuilder, Brackets } from "typeorm";

import AppDataSource from "../../db/data-source";
import Bet from "./entities/bet.entity";
import { BetFilterParams } from "./interfaces/bet-filter.interface";

export const BetsRepository = AppDataSource.getRepository(Bet).extend({
  findAll(filter?: BetFilterParams) {
    return this.createQueryBuilder("Bets")
      .where((qb: SelectQueryBuilder<Bet[]>) => {
        if (filter?.status) {
          qb.andWhere(
            new Brackets((bqb) => {
              bqb.where("Bets.status = :status", {
                status: filter.status,
              });
            })
          );
        }
      })
      .getMany();
  },
});
