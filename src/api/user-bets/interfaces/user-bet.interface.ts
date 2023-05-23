import { IBaseRecord } from "../../shared/interfaces/base-record.interface";
import { BetResult } from "../../shared/enums/bet-result.enum";
import { UserBetsStatus } from "../enums/user-bets-status.enum";

export interface IUserBet extends IBaseRecord {
  userId: number;
  betId: number;
  odd: number;
  result: BetResult;
  amount: number;
  status: UserBetsStatus;
}
