import { Server } from "@hapi/hapi";
import { UsersController } from "./users.controller";
import * as UserValidator from "./user.validator";
import { ParamsIdValidator } from "../shared/validators/request-validators";

export default function (server: Server) {
  const userController = new UsersController();
  server.bind(userController);

  // Update User
  server.route({
    method: "PUT",
    path: "/users/{id}",
    options: {
      handler: userController.updateUser,
      tags: ["api", "users"],
      description: "Update an user.",
      validate: {
        payload: UserValidator.updateUser,
        params: ParamsIdValidator,
      },
      auth: "jwt",
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "User updated.",
            },
            "401": {
              description: "User does not have authorization.",
            },
          },
        },
      },
    },
  });
}
