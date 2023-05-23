import { Server } from "@hapi/hapi";

import { UserBetsController } from "./user-bets.controller";
import * as UserBetValidator from "./user-bet.validator";
import { ParamsIdValidator } from "../shared/validators/request-validators";
import { Role } from "../shared/enums/role.enum";

export default function (server: Server) {
  const userBetsController = new UserBetsController();
  server.bind(userBetsController);

  // Get all User Bets
  server.route({
    method: "GET",
    path: "/userBets",
    options: {
      handler: userBetsController.getAll,
      tags: ["api", "User Bets"],
      description: "Get all user bets",
      validate: {
        query: UserBetValidator.getAllUserBet,
      },
      auth: "jwt",
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "User Bets fetched.",
            },
          },
        },
      },
    },
  });

  // Create an User Bet
  server.route({
    method: "POST",
    path: "/userBets",
    options: {
      handler: userBetsController.createUserBet,
      tags: ["api", "User Bets"],
      description: "Create an user bet.",
      validate: {
        payload: UserBetValidator.createUserBet,
      },
      auth: {
        scope: Role.USER,
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "User bet created.",
            },
          },
        },
      },
    },
  });

  // Update an User Bet
  server.route({
    method: "PUT",
    path: "/userBets/{id}",
    options: {
      handler: userBetsController.updateUserBet,
      tags: ["api", "Events"],
      description: "Update an event.",
      validate: {
        payload: UserBetValidator.updateUserBet,
        params: ParamsIdValidator,
      },
      auth: {
        scope: Role.USER,
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "User bet created.",
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
