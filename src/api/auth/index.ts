import { Server } from "@hapi/hapi";
import AuthRoutes from "./auth-routes";

export function init(server: Server) {
  AuthRoutes(server);
}
