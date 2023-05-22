import { Server } from "@hapi/hapi";

import { UserBetsController } from "./user-bets.controller";
import * as UserBetValidator from "./user-bet.validator";
import { ParamsIdValidator } from "../shared/validators/request-validators";

export default function (server: Server) {
  const userBetsController = new UserBetsController();
  server.bind(userBetsController);

  // Get all Events
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
            "201": {
              description: "User Bets fetched.",
            },
          },
        },
      },
    },
  });

  // Create Event
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
      auth: "jwt",
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "User bet created.",
            },
          },
        },
      },
    },
  });

  // Update Event
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
      auth: "jwt",
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
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
