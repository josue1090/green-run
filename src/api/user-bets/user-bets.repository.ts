import { SelectQueryBuilder, Brackets } from "typeorm";
import AppDataSource from "../../db/data-source";
import UserBet from "./entities/user-bet.entity";
import { UserBetsFilterParams } from "./interfaces/user-bets-filter.interface";

export const UserBetsRepository = AppDataSource.getRepository(UserBet).extend({
  findAll(filter?: UserBetsFilterParams) {
    return this.createQueryBuilder("UserBets")
      .where((qb: SelectQueryBuilder<UserBet[]>) => {
        if (filter?.userId) {
          qb.andWhere(
            new Brackets((bqb) => {
              bqb.where("UserBets.userId = :userId", {
                userId: filter.userId,
              });
            })
          );
        }

        if (filter?.betId) {
          qb.andWhere(
            new Brackets((bqb) => {
              bqb.where("UserBets.betId = :betId", {
                betId: filter.betId,
              });
            })
          );
        }
      })
      .getMany();
  },
});
