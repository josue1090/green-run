import { Server } from "@hapi/hapi";

import UserTransactionRoutes from "./user-transaction-routes";

export function init(server: Server) {
  UserTransactionRoutes(server);
}
