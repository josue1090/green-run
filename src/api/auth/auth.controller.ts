import { ResponseToolkit } from "@hapi/hapi";
import * as Boom from "@hapi/boom";

import { AuthService } from "./auth.service";
import { ILoginRequest } from "./interfaces/auth-request-interfaces";
import { UsersService } from "../users/users.service";

export class AuthController {
  private readonly usersService: UsersService;
  private readonly authService: AuthService;

  constructor() {
    this.usersService = new UsersService();
    this.authService = new AuthService();
  }

  async signUp() {}

  async login(request: ILoginRequest, h: ResponseToolkit) {
    const { email, password } = request.payload;
    const user = await this.authService.authenticateUser(email, password);

    if (!user) return Boom.unauthorized();

    return h
      .response({ token: this.authService.generateToken(user, request) })
      .code(201);
  }
}
