import { BaseRequest } from "../../shared/interfaces/interface";
import { IUser } from "./user.interface";

export interface IUpdateUserRequest extends BaseRequest {
  params: {
    id: number;
  };
  payload: Partial<IUser>;
}

export interface IPlaceDepositRequest extends BaseRequest {
  payload: {
    amount: number;
  };
}

export interface IWithdrawMoney extends IPlaceDepositRequest {}
