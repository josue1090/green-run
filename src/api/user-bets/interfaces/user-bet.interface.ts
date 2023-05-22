import { BaseRecord } from "../../shared/entities/base-record.entity";
import { BetResult } from "../../shared/enums/bet-result.enum";
import { UserBetsStatus } from "../enums/user-bets-status.enum";

export interface IUserBet extends BaseRecord {
  userId: number;
  betId: number;
  odd: number;
  result: BetResult;
  amount: number;
  status: UserBetsStatus;
}
