import { UserTransactionCategory } from "../enums/user-transaction-category.enum";
import { UserTransactionStatus } from "../enums/user-transaction-status.enum";
import { IBaseRecord } from "../../shared/interfaces/base-record.interface";

export interface IUserTransaction extends IBaseRecord {
  userId: number;
  amount: number;
  category: UserTransactionCategory;
  status?: UserTransactionStatus;
  userBetId?: number;
}
