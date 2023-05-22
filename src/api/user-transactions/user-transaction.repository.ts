import { Brackets, SelectQueryBuilder } from "typeorm";
import AppDataSource from "../../db/data-source";
import UserTransaction from "./entities/user-transaction.entity";
import { UserTransactionFilterParams } from "./interfaces/user-transaction-filter.params";

export const UserTransactionRepository = AppDataSource.getRepository(
  UserTransaction
).extend({
  findAll(filter?: UserTransactionFilterParams) {
    return this.createQueryBuilder("UserTransactions")
      .where((qb: SelectQueryBuilder<UserTransaction[]>) => {
        if (filter?.category) {
          qb.andWhere(
            new Brackets((bqb) => {
              bqb.where("UserTransactions.category = :category", {
                category: filter.category,
              });
            })
          );
        }

        if (filter?.userId) {
          qb.andWhere(
            new Brackets((bqb) => {
              bqb.where("UserTransactions.userId = :userId", {
                userId: filter.userId,
              });
            })
          );
        }
      })
      .getMany();
  },
});
