import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

import { BaseRecord } from "../../shared/entities/base-record.entity";
import { IUserTransaction } from "../interfaces/user-transaction.interface";
import { UserTransactionCategory } from "../enums/user-transaction-category.enum";
import { UserTransactionStatus } from "../enums/user-transaction-status.enum";
import UserBet from "../../user-bets/entities/user-bet.entity";
import User from "../../users/entities/user.entity";

@Entity({ name: "UserTransactions" })
class UserTransaction extends BaseRecord implements IUserTransaction {
  @Column({ type: "float" })
  amount: number;

  @Column({ type: "enum", enum: UserTransactionCategory })
  category: UserTransactionCategory;

  @Column({
    type: "enum",
    enum: UserTransactionStatus,
    default: UserTransactionStatus.ACTIVE,
  })
  status: UserTransactionStatus;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.userTransactions)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ nullable: true })
  userBetId: number;

  @OneToOne(() => UserBet, (userBet) => userBet.userTransaction)
  @JoinColumn({ name: "userBetId" })
  userBet: UserBet;
}

export default UserTransaction;
