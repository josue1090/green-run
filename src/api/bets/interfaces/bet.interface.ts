import { IBaseRecord } from "../../shared/interfaces/base-record.interface";
import { EventStatus } from "../../shared/enums/event-status.enum";
import { BetResult } from "../enums/bet-result.enum";

export interface IBet extends IBaseRecord {
  option: number;
  status: EventStatus;
  name: string;
  odd: number;
  result: BetResult;
  eventId: number;
}
