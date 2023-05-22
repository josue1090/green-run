import { Server } from "@hapi/hapi";

import UserBetRoutes from "./user-bet-routes";

export function init(server: Server) {
  UserBetRoutes(server);
}
