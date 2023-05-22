import { ResponseToolkit } from "@hapi/hapi";

import {
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
}
