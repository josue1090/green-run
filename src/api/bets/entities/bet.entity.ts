import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseRecord } from "../../shared/entities/base-record.entity";
import { IBet } from "../interfaces/bet.interface";
import { EventStatus } from "../../shared/enums/event-status.enum";
import { BetResult } from "../enums/bet-result.enum";
import Event from "../../events/entities/event.entity";

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

  @Column({ type: "enum", enum: BetResult })
  result: BetResult;

  @Column()
  eventId: number;

  @ManyToOne(() => Event, (event) => event.bets)
  @JoinColumn({ name: "eventId" })
  event: Event;
}

export default Bet;
