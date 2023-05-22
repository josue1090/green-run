import { Server } from "@hapi/hapi";

import EventRoutes from "./event-routes";

export function init(server: Server) {
  EventRoutes(server);
}
