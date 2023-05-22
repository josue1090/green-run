import { Server } from "@hapi/hapi";
import { UsersController } from "./users.controller";
import * as UserValidator from "./user.validator";
import { ParamsIdValidator } from "../shared/validators/request-validators";
import { Role } from "../shared/enums/role.enum";

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

  // Check user balance ADMIN ENDPOINT
  server.route({
    method: "GET",
    path: "/users/{id}/balance",
    options: {
      handler: userController.getUserBalance,
      tags: ["api", "users"],
      description: "Check balance",
      validate: {
        params: ParamsIdValidator,
      },
      auth: {
        scope: Role.ADMIN,
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Success",
            },
            "401": {
              description: "User does not have authorization.",
            },
          },
        },
      },
    },
  });

  // Place a deposit
  server.route({
    method: "POST",
    path: "/transactions/deposit",
    options: {
      handler: userController.placeDeposit,
      tags: ["api", "transactions"],
      description: "Place a deposit",
      validate: {
        payload: UserValidator.deposit,
      },
      auth: {
        scope: Role.USER,
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Deposit success",
            },
            "401": {
              description: "User does not have authorization.",
            },
          },
        },
      },
    },
  });

  // Check user balance for a user role
  server.route({
    method: "POST",
    path: "/transactions/balance",
    options: {
      handler: userController.getCurrentUserBalance,
      tags: ["api", "transactions"],
      description: "Check balance",
      auth: "jwt",
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Success",
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
