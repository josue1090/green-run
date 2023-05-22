import { Server } from "@hapi/hapi";
import UserRoutes from "./user-routes";

export function init(server: Server) {
  UserRoutes(server);
}
