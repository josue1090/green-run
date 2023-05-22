import { EventSport } from "../../shared/enums/event-sports.enum";
import { EventStatus } from "../../shared/enums/event-status.enum";

export interface BetFilterParams {
  status?: EventStatus;
  sport?: EventSport;
  eventId?: number;
}
