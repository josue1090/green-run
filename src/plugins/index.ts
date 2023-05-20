import { Server } from "@hapi/hapi";

import { registerJwtPlugin } from "./hapiAuthJwt2";
import { registerSwaggerPlugin } from "./swagger";

type installPlugins = (server: Server) => Promise<void>;

/**
 * Registers all hapi plugins.
 */
export const installPlugins: installPlugins = async (
  server: Server
): Promise<void> => {
  await registerJwtPlugin(server);
  await registerSwaggerPlugin(server);
};
