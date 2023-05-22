import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { BaseRecord } from "../../shared/entities/base-record.entity";
import { IUserBet } from "../interfaces/user-bet.interface";
import User from "../../users/entities/user.entity";
import Bet from "../../bets/entities/bet.entity";
import { BetResult } from "../../shared/enums/bet-result.enum";
import { UserBetsStatus } from "../enums/user-bets-status.enum";

@Entity({ name: "UserBets" })
class UserBet extends BaseRecord implements IUserBet {
  @Column({ type: "float" })
  odd: number;

  @Column({ type: "enum", enum: BetResult, nullable: true })
  result: BetResult;

  @Column({ type: "float" })
  amount: number;

  @Column({ type: "enum", enum: UserBetsStatus })
  status: UserBetsStatus;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.userBets)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  betId: number;

  @ManyToOne(() => Bet, (bet) => bet.userBets)
  @JoinColumn({ name: "betId" })
  bet: Bet;
}

export default UserBet;
