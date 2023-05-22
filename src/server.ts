import { Request, ResponseToolkit, Server } from "@hapi/hapi";

import { installPlugins } from "./plugins";
import * as AuthModule from "./api/auth";
import * as UsersModule from "./api/users";
import * as EventsModule from "./api/events";
import * as BetsModule from "./api/bets";
import * as UserBetsModule from "./api/user-bets";

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
          err: Error | undefined
        ): Promise<void> => {
          if (err instanceof Error) {
            throw err;
          }
        },
      },
    },
  });

  await installPlugins(server);

  // Registering all app modules
  AuthModule.init(server);
  UsersModule.init(server);
  EventsModule.init(server);
  BetsModule.init(server);
  UserBetsModule.init(server);

  return server;
};
