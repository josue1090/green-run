import { UserTransactionCategory } from "../enums/user-transaction-category.enum";

export interface UserTransactionFilterParams {
  userId?: number;
  category?: UserTransactionCategory;
}
