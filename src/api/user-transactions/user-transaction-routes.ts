import { Server } from "@hapi/hapi";
import { UserTransactionsController } from "./user-transactions.controller";
import * as UserTransactionValidator from "./user-transaction.validator";

export default function (server: Server) {
  const userTransactionsController = new UserTransactionsController();
  server.bind(userTransactionsController);

  // Get all Bets
  server.route({
    method: "GET",
    path: "/userTransaction",
    options: {
      handler: userTransactionsController.getAll,
      tags: ["api", "User Transactions"],
      description: "Get all User transactions",
      validate: {
        query: UserTransactionValidator.getAllUserTransactions,
      },
      auth: "jwt",
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "User transactions fetched.",
            },
          },
        },
      },
    },
  });
}
