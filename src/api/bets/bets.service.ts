import * as Boom from "@hapi/boom";

import { BetsRepository } from "./bets.repository";
import Bet from "./entities/bet.entity";
import { BetFilterParams } from "./interfaces/bet-filter.interface";
import { IBet } from "./interfaces/bet.interface";
import { EventStatus } from "../shared/enums/event-status.enum";
import { UserBetsService } from "../user-bets/user-bets.service";
import { BetResult } from "../shared/enums/bet-result.enum";
import { UserTransactionsService } from "../user-transactions/user-transactions.service";
import { IUserTransaction } from "../user-transactions/interfaces/user-transaction.interface";
import { UserTransactionCategory } from "../user-transactions/enums/user-transaction-category.enum";
import { UserTransactionStatus } from "../user-transactions/enums/user-transaction-status.enum";

export class BetsService {
  private readonly betsRepository: typeof BetsRepository;
  private readonly userBetsService: UserBetsService;
  private readonly userTransactionsService: UserTransactionsService;

  constructor() {
    this.betsRepository = BetsRepository;
    this.userBetsService = new UserBetsService();
    this.userTransactionsService = new UserTransactionsService();
  }

  async getAll(filter?: BetFilterParams): Promise<Bet[]> {
    return this.betsRepository.findAll(filter);
  }

  async findById(id: number): Promise<Bet> {
    const bet = await this.betsRepository.findOne({ where: { id } });

    if (!bet) throw Boom.notFound();

    return bet;
  }

  async create(betPayload: IBet): Promise<Bet> {
    const bet = await this.betsRepository.create(betPayload);
    return this.betsRepository.save(bet);
  }

  async update(id: number, updateBetPayload: Partial<IBet>): Promise<Bet> {
    const bet = await this.findById(id);
    const updatePayload = { ...updateBetPayload };

    if (bet.isSettled() && updateBetPayload.status == EventStatus.CANCELLED)
      throw Boom.badData();

    if (updateBetPayload.result == BetResult.WON) {
      const userBets = await this.userBetsService.getAll({ betId: id });
      console.log(userBets);
      for (const userBet of userBets) {
        const userTransactionPayload: IUserTransaction = {
          userId: userBet.userId,
          amount: bet.odd * userBet.amount,
          category: UserTransactionCategory.WINNIG,
          status: UserTransactionStatus.COMPLETED,
          userBetId: userBet.id,
        };

        await this.userTransactionsService.createUserTransaction(
          userTransactionPayload
        );
      }
    }

    this.betsRepository.merge(bet, updatePayload);
    return bet.save();
  }

  async softDelete(id: number): Promise<Bet> {
    const bet = await this.findById(id);
    return bet.save();
  }

  async recoverOne(id: number): Promise<Bet> {
    const bet = await this.betsRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!bet?.deletedAt) throw Boom.notFound();

    return this.betsRepository.recover(bet);
  }
}
