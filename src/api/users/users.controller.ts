import { ResponseToolkit } from "@hapi/hapi";
import * as Boom from "@hapi/boom";

import { ICreateUserUserRequest } from "./interfaces/user-request-interfaces";
import User from "./entities/user.entity";
import { AuthService } from "../auth/auth.service";
import { encryptPassword } from "../../utils/user.utils";
import { UsersService } from "./users.service";

export class UsersController {
  private readonly usersService: UsersService;
  private readonly authService: AuthService;

  constructor() {
    this.usersService = new UsersService();
    this.authService = new AuthService();
  }

  public async createUser(request: ICreateUserUserRequest, h: ResponseToolkit) {
    try {
      const encriptedPassword = await encryptPassword(request.payload.password);
      const user: User = await this.usersService.create({
        ...request.payload,
        password: encriptedPassword,
      });
      return h
        .response({ token: this.authService.generateToken(user, request) })
        .code(201);
    } catch (error: any) {
      return Boom.badImplementation(error);
    }
  }
}
