import { Server } from "@hapi/hapi";

import * as BetValidator from "./bet.validator";
import { BetsController } from "./bets.controller";
import { ParamsIdValidator } from "../shared/validators/request-validators";

export default function (server: Server) {
  const betsController = new BetsController();
  server.bind(betsController);

  // Get all Bets
  server.route({
    method: "GET",
    path: "/bets",
    options: {
      handler: betsController.getAll,
      tags: ["api", "Bets"],
      description: "Get all Bets",
      validate: {
        query: BetValidator.getAllBets,
      },
      auth: "jwt",
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Bets fetched.",
            },
          },
        },
      },
    },
  });

  // Create Event
  server.route({
    method: "POST",
    path: "/bets",
    options: {
      handler: betsController.createBet,
      tags: ["api", "Bets"],
      description: "Create a bet.",
      validate: {
        payload: BetValidator.createBet,
      },
      auth: "jwt",
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Bet created.",
            },
          },
        },
      },
    },
  });

  // Update Event
  server.route({
    method: "PUT",
    path: "/bets/{id}",
    options: {
      handler: betsController.updateBet,
      tags: ["api", "Bets"],
      description: "Update a bet.",
      validate: {
        payload: BetValidator.updateBet,
        params: ParamsIdValidator,
      },
      auth: "jwt",
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Bet created.",
            },
            "401": {
              description: "User does not have authorization.",
            },
          },
        },
      },
    },
  });

  // Delete Event
  server.route({
    method: "DELETE",
    path: "/bets/{id}",
    options: {
      handler: betsController.deleteOne,
      tags: ["api", "Bets"],
      description: "Delete a bet.",
      validate: {
        params: ParamsIdValidator,
      },
      auth: "jwt",
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Bet deleted.",
            },
            "401": {
              description: "User does not have authorization.",
            },
          },
        },
      },
    },
  });

  // Recover Event
  server.route({
    method: "DELETE",
    path: "/bets/{id}/recover",
    options: {
      handler: betsController.recoverOne,
      tags: ["api", "Bets"],
      description: "Recover a bet.",
      validate: {
        params: ParamsIdValidator,
      },
      auth: "jwt",
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Bet recovered.",
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
