import { ResponseToolkit } from "@hapi/hapi";

import { BetsService } from "./bets.service";
import {
  ICreateBetRequest,
  IGetAllBetsRequest,
  IUpdateBetRequest,
} from "./interfaces/bet-request-interfaces";
import { IdParamRequest } from "../../common/interface";

export class BetsController {
  private readonly betsService: BetsService;

  constructor() {
    this.betsService = new BetsService();
  }

  async getAll(request: IGetAllBetsRequest, h: ResponseToolkit) {
    const bets = await this.betsService.getAll(request.query);

    return h.response(bets);
  }

  async createBet(request: ICreateBetRequest, h: ResponseToolkit) {
    const bet = await this.betsService.create(request.payload);
    return h.response(bet);
  }

  async updateBet(request: IUpdateBetRequest, h: ResponseToolkit) {
    const updatedBet = await this.betsService.update(
      request.params.id,
      request.payload
    );

    return h.response(updatedBet);
  }

  async deleteOne(request: IdParamRequest, h: ResponseToolkit) {
    const deletedBet = await this.betsService.softDelete(request.params.id);
    return h.response(deletedBet);
  }

  async recoverOne(request: IdParamRequest, h: ResponseToolkit) {
    const recoveredBet = await this.betsService.recoverOne(request.params.id);
    return h.response(recoveredBet);
  }
}
