import * as Jwt from "jsonwebtoken";
import User from "../users/entities/user.entity";
import { BaseRequest } from "../../common/interface";

export class AuthService {
  generateToken(user: User, request: BaseRequest) {
    const jwtSecret = request.server.app.JWT_SECRET;
    const jwtExpiration = process.env.JWT_EXPIRATION;
    const payload = { id: user.id };

    return Jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
  }
}
