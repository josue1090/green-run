import { Column, Entity, OneToMany } from "typeorm";

import { BaseRecord } from "../../shared/entities/base-record.entity";
import { IEvent } from "../interfaces/event.interface";
import { EventSport } from "../../shared/enums/event-sports.enum";
import { EventStatus } from "../../shared/enums/event-status.enum";
import { EventScore } from "../enums/event-score.enum";
import Bet from "../../bets/entities/bet.entity";

@Entity({ name: "Events" })
class Event extends BaseRecord implements IEvent {
  @Column({ type: "varchar", length: 100 })
  firstTeam: string;

  @Column({ type: "varchar", length: 100 })
  secondTeam: string;

  @Column({ type: "enum", enum: EventSport, default: EventSport.SOCCER })
  sport: EventSport;

  @Column({ type: "enum", enum: EventStatus, default: EventStatus.ACTIVE })
  status: EventStatus;

  @Column({ type: "enum", enum: EventScore, nullable: true })
  score: EventScore;

  @OneToMany(() => Bet, (bet) => bet.event)
  bets: Bet[];
}

export default Event;
