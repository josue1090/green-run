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
  getUserBalance(userId: number) {
    return this.query(`
      SELECT UserBalance.userId, SUM(UserBalance.balance) as balance
      FROM (SELECT UT.userId,
                   IF(UT.category IN ('deposit', 'winning'), CAST(UT.amount as signed),
                      CAST((UT.amount * -1) as signed)) as balance
            FROM UserTransactions UT
            WHERE UT.userId = ?) as UserBalance
      GROUP BY UserBalance.userId;
    `, [userId]);
  }
});
