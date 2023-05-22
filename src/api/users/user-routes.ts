import { Server } from "@hapi/hapi";
import { UsersController } from "./users.controller";
import * as UserValidator from "./user.validator";
import { ParamsIdValidator } from "../shared/validators/request-validators";
import { Role } from "../shared/enums/role.enum";

export default function (server: Server) {
  const userController = new UsersController();
  server.bind(userController);

  // Create user
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

  // Update User
  server.route({
    method: "PUT",
    path: "/users/{id}",
    options: {
      handler: userController.updateUser,
      tags: ["api", "users"],
      description: "Update a user.",
      validate: {
        payload: UserValidator.updateUser,
        params: ParamsIdValidator,
      },
      // TODO work on this
      // auth: {
      //   access: {
      //     scope: ["user", "USER"],
      //   },
      // },
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
