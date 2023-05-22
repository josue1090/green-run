import { IBaseRecord } from "../../shared/interfaces/base-record.interface";
import { EventStatus } from "../../shared/enums/event-status.enum";
import { BetResult } from "../../shared/enums/bet-result.enum";
import { EventSport } from "../../shared/enums/event-sports.enum";

export interface IBet extends IBaseRecord {
  option: number;
  status?: EventStatus;
  name: string;
  odd: number;
  sport: EventSport;
  result?: BetResult;
  eventId: number;
}
