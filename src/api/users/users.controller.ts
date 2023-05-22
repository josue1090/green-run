import { ResponseToolkit } from "@hapi/hapi";

import {
  IPlaceDepositRequest,
  IUpdateUserRequest,
} from "./interfaces/user-request-interfaces";
import { UsersService } from "./users.service";

export class UsersController {
  private readonly usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async updateUser(request: IUpdateUserRequest, h: ResponseToolkit) {
    const updatedUser = await this.usersService.update(
      request.params.id,
      request.payload
    );

    return h.response(updatedUser);
  }

  async placeDeposit(request: IPlaceDepositRequest, h: ResponseToolkit) {
    const userId = request.auth.credentials.id as any;
    const transaction = await this.usersService.depositMoney(
      userId,
      request.payload.amount
    );

    return h.response(transaction);
  }
}
