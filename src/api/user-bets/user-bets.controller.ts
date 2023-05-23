import { ResponseToolkit } from "@hapi/hapi";

import { UserBetsService } from "./user-bets.service";
import {
  ICreateUserBetRequest,
  IGetAllUserBetsRequest,
  IUpdateUserBetRequest,
} from "./interfaces/user-bets-request-interfaces";

export class UserBetsController {
  private readonly userBetsService: UserBetsService;

  constructor() {
    this.userBetsService = new UserBetsService();
  }

  async getAll(request: IGetAllUserBetsRequest, h: ResponseToolkit) {
    const userBets = await this.userBetsService.getAll(request.query);

    return h.response(userBets);
  }

  async createUserBet(request: ICreateUserBetRequest, h: ResponseToolkit) {
    const userId = parseInt(String(request.auth.credentials.id || 0));
    const userBet = await this.userBetsService.create({
      ...request.payload,
      userId,
    });
    return h.response(userBet);
  }

  async updateUserBet(request: IUpdateUserBetRequest, h: ResponseToolkit) {
    const userBet = await this.userBetsService.update(
      request.params.id,
      request.payload
    );
    return h.response(userBet);
  }
}
