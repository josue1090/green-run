import { Server } from "@hapi/hapi";

import BetRoutes from "./bet-routes";

export function init(server: Server) {
  BetRoutes(server);
}
