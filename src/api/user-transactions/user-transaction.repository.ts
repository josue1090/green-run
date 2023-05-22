import AppDataSource from "../../db/data-source";
import UserTransaction from "./entities/user-transaction.entity";

export const UserTransactionRepository =
  AppDataSource.getRepository(UserTransaction);
