import { Request, ResponseToolkit, Server } from "@hapi/hapi";

import { installPlugins } from "./plugins";

type init = () => Promise<Server>;

/**
 * Initializes hapi server and loads its plugins.
 */
export const init: init = async (): Promise<Server> => {
  const server: Server = new Server({
    host: "localhost",
    port: 3000,
    routes: {
      cors: {
        origin: ["*"],
      },
      validate: {
        failAction: async (
          request: Request,
          h: ResponseToolkit,
          err: Error | undefined,
        ): Promise<void> => {
          if (err instanceof Error) {
            throw err;
          }
        },
      },
    },
  });

  await installPlugins(server);

  User.init(server);

  return server;
};
