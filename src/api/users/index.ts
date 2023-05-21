import { Server } from "@hapi/hapi";
import Routes from "./routes";

export function init(server: Server) {
  Routes(server);
}
