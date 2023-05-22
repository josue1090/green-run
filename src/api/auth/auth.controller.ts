import { ResponseToolkit } from "@hapi/hapi";
import * as Boom from "@hapi/boom";

import { AuthService } from "./auth.service";
import {
  ILoginRequest,
  ISignUpRequest,
} from "./interfaces/auth-request-interfaces";
import { UsersService } from "../users/users.service";
import { encryptPassword } from "../../utils/user.utils";
import User from "../users/entities/user.entity";

export class AuthController {
  private readonly usersService: UsersService;
  private readonly authService: AuthService;

  constructor() {
    this.usersService = new UsersService();
    this.authService = new AuthService();
  }

  async signUp(request: ISignUpRequest, h: ResponseToolkit) {
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

  async login(request: ILoginRequest, h: ResponseToolkit) {
    const { email, password } = request.payload;
    const user = await this.authService.authenticateUser(email, password);

    if (!user) return Boom.unauthorized();

    return h
      .response({ token: this.authService.generateToken(user, request) })
      .code(201);
  }
}
