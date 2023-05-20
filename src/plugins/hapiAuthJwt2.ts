import { unauthorized } from "@hapi/boom";
import { Request, Server } from "@hapi/hapi";
import * as HapiAuthJwt2 from "hapi-auth-jwt2";
import { verify } from "jsonwebtoken";

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
  console.log("registering jwt");
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
