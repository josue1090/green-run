import * as Jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import { UsersService } from "./../users/users.service";
import User from "../users/entities/user.entity";
import { BaseRequest } from "../../common/interface";

export class AuthService {
  private readonly usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }
  generateToken(user: User, request: BaseRequest) {
    const jwtSecret = request.server.app.JWT_SECRET;
    const jwtExpiration = process.env.JWT_EXPIRATION;
    const payload = { id: user.id };

    return Jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
  }

  async authenticateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    const authenticated = await bcrypt.compare(password, user?.password || "");
    return authenticated ? user : null;
  }
}
