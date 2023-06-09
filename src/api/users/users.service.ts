import * as Boom from "@hapi/boom";

import User from "./entities/user.entity";
import { IUser } from "./interfaces/user.interface";
import { UsersRepository } from "./users.repository";
import { UserTransactionsService } from "../user-transactions/user-transactions.service";
import { encryptPassword } from "../../utils/user.utils";

export class UsersService {
  private readonly usersRepository: typeof UsersRepository;
  private readonly userTransactionsService: UserTransactionsService;

  constructor() {
    this.usersRepository = UsersRepository;
    this.userTransactionsService = new UserTransactionsService();
  }

  async create(userPayload: IUser): Promise<User> {
    const user = await this.usersRepository.create(userPayload);
    return this.usersRepository.save(user);
  }

  async update(
    id: number,
    userUpdatePayload: Partial<IUser>,
    currentUserId: number
  ): Promise<User> {
    const user = await this.findById(id);

    if (user.isAdmin() && user.id !== currentUserId) throw Boom.unauthorized();

    let encryptedPayload = {};

    if (userUpdatePayload.password) {
      const encryptedPassword = await encryptPassword(
        userUpdatePayload.password
      );
      encryptedPayload = { password: encryptedPassword };
    }

    this.usersRepository.merge(user, {
      ...userUpdatePayload,
      ...encryptedPayload,
    });
    return user.save();
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw Boom.notFound();

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async depositMoney(userId: number, amount: number) {
    return this.userTransactionsService.createDepositTransaction(
      userId,
      amount
    );
  }

  async withDrawMoney(userId: number, amount: number) {
    return this.userTransactionsService.createWithdrawTransaction(
      userId,
      amount
    );
  }

  async getUserBalance(userId: number): Promise<number | null> {
    return this.userTransactionsService.getUserBalance(userId);
  }
}
