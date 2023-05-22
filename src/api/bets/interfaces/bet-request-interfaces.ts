import { BaseRequest } from "../../shared/interfaces/interface";
import { BetFilterParams } from "./bet-filter.interface";
import { IBet } from "./bet.interface";

export interface IGetAllBetsRequest extends BaseRequest {
  query: BetFilterParams;
}

export interface ICreateBetRequest extends BaseRequest {
  payload: IBet;
}

export interface IUpdateBetRequest extends BaseRequest {
  params: {
    id: number;
  };
  payload: Partial<IBet>;
}
