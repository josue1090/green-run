import { Server } from "@hapi/hapi";
import { UsersController } from "./users.controller";
import * as UserValidator from "./user.validator";

export default function (server: Server) {
  const userController = new UsersController();
  server.bind(userController);

  server.route({
    method: "POST",
    path: "/users",
    options: {
      handler: userController.createUser,
      auth: false,
      tags: ["api", "users"],
      description: "Create a user.",
      validate: {
        payload: UserValidator.createUser,
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
