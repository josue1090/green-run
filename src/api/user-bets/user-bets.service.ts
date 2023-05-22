import * as Boom from "@hapi/boom";

import UserBet from "./entities/user-bet.entity";
import { UserBetsFilterParams } from "./interfaces/user-bets-filter.interface";
import { IUserBet } from "./interfaces/user-bet.interface";
import { UserBetsRepository } from "./user-bets.repository";

export class UserBetsService {
  private readonly userBetsRepository: typeof UserBetsRepository;

  constructor() {
    this.userBetsRepository = UserBetsRepository;
  }

  async getAll(filter?: UserBetsFilterParams): Promise<UserBet[]> {
    return this.userBetsRepository.findAll(filter);
  }

  async findById(id: number): Promise<UserBet> {
    const userBet = await this.userBetsRepository.findOne({ where: { id } });

    if (!userBet) throw Boom.notFound();

    return userBet;
  }

  async create(userBetPayload: IUserBet): Promise<IUserBet> {
    const userBet = await this.userBetsRepository.create(userBetPayload);
    return this.userBetsRepository.save(userBet);
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
