import * as Boom from "@hapi/boom";
import { Request, Server } from "@hapi/hapi";
import * as HapiAuthJwt2 from "hapi-auth-jwt2";
import { verify } from "jsonwebtoken";

import AppDataSource from "../db/data-source";
import User from "../api/users/entities/user.entity";

type registerJwtPlugin = (server: Server) => Promise<void>;
type validate = (
  decoded: Decoded,
  request: Request
) => Promise<ValidateResponse>;

interface Decoded {
  exp: number;
  iat: number;
  id: string;
}

interface ValidateResponse {
  isValid: boolean;
}
const validate: validate = async (
  decoded: Decoded,
  request: Request
): Promise<ValidateResponse> => {
  verify(request.headers.authorization, process.env.JWT_SECRET as string);
  const user = await AppDataSource.getRepository(User).findOne({
    where: { id: parseInt(decoded.id) },
  });

  if (!user) {
    throw Boom.unauthorized("Unauthorized.");
  }

  return {
    isValid: true,
  };
};
/**
 * Registers jwt hapi plugin on server.
 */
export const registerJwtPlugin: registerJwtPlugin = async (
  server: Server
): Promise<void> => {
  await server.register(HapiAuthJwt2);

  server.auth.strategy("jwt", "jwt", {
    key: process.env.JWT_SECRET,
    validate,
    verifyOptions: {
      algorithms: ["HS256"],
    },
  });

  server.auth.default("jwt");
};
