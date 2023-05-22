import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { BaseRecord } from "../../shared/entities/base-record.entity";
import { IBet } from "../interfaces/bet.interface";
import { EventStatus } from "../../shared/enums/event-status.enum";
import { BetResult } from "../../shared/enums/bet-result.enum";
import Event from "../../events/entities/event.entity";
import UserBet from "../../user-bets/entities/user-bet.entity";
import { EventSport } from "../../shared/enums/event-sports.enum";

@Entity({ name: "Bets" })
class Bet extends BaseRecord implements IBet {
  @Column({ type: "integer", default: 1 })
  option: number;

  @Column({ type: "enum", enum: EventStatus, default: EventStatus.ACTIVE })
  status: EventStatus;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "float" })
  odd: number;

  @Column({ type: "enum", enum: BetResult, nullable: true })
  result: BetResult;

  @Column({ type: "enum", enum: EventSport })
  sport: EventSport;

  @Column()
  eventId: number;

  @ManyToOne(() => Event, (event) => event.bets)
  @JoinColumn({ name: "eventId" })
  event: Event;

  @OneToMany(() => UserBet, (userBet) => userBet.bet)
  userBets: UserBet[];
}

export default Bet;
