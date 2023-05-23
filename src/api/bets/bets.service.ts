import * as Boom from "@hapi/boom";

import { BetsRepository } from "./bets.repository";
import Bet from "./entities/bet.entity";
import { BetFilterParams } from "./interfaces/bet-filter.interface";
import { IBet } from "./interfaces/bet.interface";
import { EventStatus } from "../shared/enums/event-status.enum";

export class BetsService {
  private readonly betsRepository: typeof BetsRepository;

  constructor() {
    this.betsRepository = BetsRepository;
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

    if (bet.isSettled() && updateBetPayload.status == EventStatus.CANCELLED)
      throw Boom.badData();

    this.betsRepository.merge(bet, updateBetPayload);
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
