import { BaseRequest } from "../../shared/interfaces/interface";
import { IUserBet } from "./user-bet.interface";
import { UserBetsFilterParams } from "./user-bets-filter.interface";

export interface IGetAllUserBetsRequest extends BaseRequest {
  query: UserBetsFilterParams;
}

export interface ICreateUserBetRequest extends BaseRequest {
  payload: IUserBet;
}

export interface IUpdateUserBetRequest extends BaseRequest {
  params: {
    id: number;
  };
  payload: Partial<IUserBet>;
}
