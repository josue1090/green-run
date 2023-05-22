import { Server } from "@hapi/hapi";

import * as AuthValidator from "./auth.validator";
import { AuthController } from "./auth.controller";

export default function (server: Server) {
  const authController = new AuthController();
  server.bind(authController);

  server.route({
    method: "POST",
    path: "/auth/login",
    options: {
      handler: authController.login,
      auth: false,
      tags: ["api", "auth"],
      description: "Login a user.",
      validate: {
        payload: AuthValidator.login,
      },
    },
  });

  server.route({
    method: "POST",
    path: "/auth/signUp",
    options: {
      handler: authController.signUp,
      auth: false,
      tags: ["api", "auth"],
      description: "Register a new User",
      validate: {
        payload: AuthValidator.signUp,
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "User created.",
            },
          },
        },
      },
    },
  });
}
