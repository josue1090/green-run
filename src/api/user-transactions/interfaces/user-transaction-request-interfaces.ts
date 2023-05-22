import { BaseRequest } from "../../shared/interfaces/interface";
import { UserTransactionFilterParams } from "./user-transaction-filter.params";
import { IUserTransaction } from "./user-transaction.interface";

export interface IGetAllUserTransactionsRequest extends BaseRequest {
  query: UserTransactionFilterParams;
}

export interface ICreateUserTransactionRequest extends BaseRequest {
  payload: IUserTransaction;
}
