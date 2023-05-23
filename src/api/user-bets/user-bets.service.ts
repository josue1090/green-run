import { BetsRepository } from "./../bets/bets.repository";
import * as Boom from "@hapi/boom";

import UserBet from "./entities/user-bet.entity";
import { UserBetsFilterParams } from "./interfaces/user-bets-filter.interface";
import { IUserBet } from "./interfaces/user-bet.interface";
import { UserBetsRepository } from "./user-bets.repository";
import { UserTransactionsService } from "../user-transactions/user-transactions.service";

export class UserBetsService {
  private readonly userBetsRepository: typeof UserBetsRepository;
  private readonly userTransactionsService: UserTransactionsService;
  private readonly betsRepository: typeof BetsRepository;

  constructor() {
    this.userBetsRepository = UserBetsRepository;
    this.userTransactionsService = new UserTransactionsService();
    this.betsRepository = BetsRepository;
  }

  async getAll(filter?: UserBetsFilterParams): Promise<UserBet[]> {
    return this.userBetsRepository.findAll(filter);
  }

  async findById(id: number): Promise<UserBet> {
    const userBet = await this.userBetsRepository.findOne({ where: { id } });

    if (!userBet) throw Boom.notFound();

    return userBet;
  }

  async create(userBetPayload: IUserBet): Promise<UserBet> {
    const { userId, betId, amount } = userBetPayload;
    const userHasEnoughMoney =
      await this.userTransactionsService.userCanGetAmount(userId, amount);

    if (!userHasEnoughMoney) throw Boom.paymentRequired();

    const bet = await this.betsRepository.findOneBy({ id: betId });
    if (!bet?.isActive()) throw Boom.paymentRequired();

    const userBet = await this.userBetsRepository.create(userBetPayload);
    const persistedUserBet = await this.userBetsRepository.save(userBet);

    await this.userTransactionsService.createUserTransactionByUserBet(
      persistedUserBet
    );

    return persistedUserBet;
  }

  async update(
    id: number,
    updateUserBetPayload: Partial<IUserBet>
  ): Promise<UserBet> {
    const userBet = await this.findById(id);
    this.userBetsRepository.merge(userBet, updateUserBetPayload);
    return userBet.save();
  }
}
