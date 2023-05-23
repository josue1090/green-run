import { ResponseToolkit } from "@hapi/hapi";

import {
  IPlaceDepositRequest,
  IUpdateUserRequest,
  IWithdrawMoney,
} from "./interfaces/user-request-interfaces";
import { UsersService } from "./users.service";
import { BaseRequest, IdParamRequest } from "../shared/interfaces/interface";

export class UsersController {
  private readonly usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async updateUser(request: IUpdateUserRequest, h: ResponseToolkit) {
    const updatedUser = await this.usersService.update(
      request.params.id,
      request.payload,
      request.auth.credentials.id as any
    );

    return h.response(updatedUser);
  }

  async placeDeposit(request: IPlaceDepositRequest, h: ResponseToolkit) {
    const userId = request.auth.credentials.id as any;
    await this.usersService.depositMoney(userId, request.payload.amount);

    return h.response({ success: true });
  }

  async withDrawMoney(request: IWithdrawMoney, h: ResponseToolkit) {
    const userId = request.auth.credentials.id as any;
    await this.usersService.withDrawMoney(userId, request.payload.amount);

    return h.response({ success: true });
  }

  async getCurrentUserBalance(request: BaseRequest, h: ResponseToolkit) {
    const userId = request.auth.credentials.id as any;

    const balance = await this.usersService.getUserBalance(userId);

    return h.response({ balance });
  }

  async getUserBalance(request: IdParamRequest, h: ResponseToolkit) {
    const userId = request.params.id;

    const balance = await this.usersService.getUserBalance(userId);

    return h.response({ balance });
  }
}
