import { IBaseRecord } from "../../shared/interfaces/base-record.interface";
import { EventScore } from "../enums/event-score.enum";
import { EventSport } from "../../shared/enums/event-sports.enum";
import { EventStatus } from "../../shared/enums/event-status.enum";

export interface IEvent extends IBaseRecord {
  firstTeam: string;
  secondTeam: string;
  sport: EventSport;
  status: EventStatus;
  score?: EventScore;
}
