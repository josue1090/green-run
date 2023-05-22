import { Column, Entity, OneToMany } from "typeorm";

import { BaseRecord } from "../../shared/entities/base-record.entity";
import { IUser as UserModel } from "../interfaces/user.interface";
import { Role } from "../../shared/enums/role.enum";
import { UserState } from "../enums/user-state.enum";
import UserBet from "../../user-bets/entities/user-bet.entity";

@Entity({ name: "Users" })
class User extends BaseRecord implements UserModel {
  @Column({ type: "enum", enum: Role })
  role: Role;

  @Column({ type: "varchar", length: 100 })
  firstName: string;

  @Column({ type: "varchar", length: 100 })
  lastName: string;

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

  @Column({ type: "varchar", length: 100 })
  country: string;

  @Column({ type: "varchar" })
  city: string;

  @Column({ type: "varchar", length: 100 })
  category: string;

  @Column({ type: "varchar", length: 100 })
  documentNumber: string;

  @Column({ type: "enum", enum: UserState, default: UserState.ACTIVE })
  userState: UserState;

  @OneToMany(() => UserBet, (userBet) => userBet.user)
  userBets: UserBet[];
}

export default User;
