import { AfterLoad, Column, Entity, Index, OneToMany } from "typeorm";

import { BaseRecord } from "../../shared/entities/base-record.entity";
import { IUser as UserModel } from "../interfaces/user.interface";
import { Role } from "../../shared/enums/role.enum";
import { UserState } from "../enums/user-state.enum";
import UserBet from "../../user-bets/entities/user-bet.entity";
import UserTransaction from "../../user-transactions/entities/user-transaction.entity";

@Entity({ name: "Users" })
@Index("users_email_index", ["email"], { unique: true })
class User extends BaseRecord implements UserModel {
  @Column({ type: "enum", enum: Role })
  role: Role;

  @Column({ type: "varchar", length: 100 })
  firstName: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  lastName?: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  phone?: string;

  @Column({ type: "varchar", length: 100 })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "varchar", length: 100 })
  username: string;

  @Column({ type: "varchar", nullable: true })
  address?: string;

  @Column({ type: "varchar", nullable: true, length: 100 })
  gender?: string;

  @Column({ type: "datetime", nullable: true })
  birthDate?: Date;

  @Column({ type: "varchar", length: 100, nullable: true })
  country?: string;

  @Column({ type: "varchar", nullable: true })
  city?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  category?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  documentNumber?: string;

  @Column({ type: "enum", enum: UserState, default: UserState.ACTIVE })
  userState?: UserState;

  @OneToMany(() => UserBet, (userBet) => userBet.user)
  userBets: UserBet[];

  @OneToMany(() => UserTransaction, (userTransaction) => userTransaction.user)
  userTransactions: UserTransaction[];

  scope: string;

  @AfterLoad()
  setScope() {
    this.scope = this.role;
  }
}

export default User;
