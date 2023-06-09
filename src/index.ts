import { Boom } from "@hapi/boom";
import { Request, ResponseObject, ResponseToolkit, Server } from "@hapi/hapi";
import * as Dotenv from "dotenv";
// tslint:disable-next-line: no-import-side-effect
import "reflect-metadata";

import { init } from "./server";
import AppDataSource from "./db/data-source";

type preResponse = (request: Request, h: ResponseToolkit) => symbol;
type start = () => Promise<void>;
type loadEnvs = () => Dotenv.DotenvParseOutput;

/**
 * Prints all unhandled errors on the screen.
 */
const preResponse: preResponse = (
  request: Request,
  h: ResponseToolkit
): symbol => {
  const response: ResponseObject | Boom = request.response;

  if (!(response as Boom).isBoom) {
    return h.continue;
  }

  console.error(response);
  throw response;
};

/**
 * Checks if all needed environment variables exist
 */
const loadEnvs: loadEnvs = (): Dotenv.DotenvParseOutput => {
  const dotenvConfigOutput: Dotenv.DotenvConfigOutput = Dotenv.config();
  if (
    dotenvConfigOutput.error !== undefined ||
    dotenvConfigOutput.parsed === undefined
  ) {
    throw dotenvConfigOutput.error;
  }
  const { parsed: envs } = dotenvConfigOutput;

  return envs;
};

/**
 * Starts hapi server, loads environment variables and connects to the database
 */
const start: start = async (): Promise<void> => {
  // Start database
  AppDataSource.initialize()
    .then(async () => {
      console.log("Data Source has been initialized!");
      await AppDataSource.runMigrations();
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  // Start Server
  const server: Server = await init();

  server.ext("onPreResponse", preResponse);
  server.app = loadEnvs();

  await server.start();
};

start()
  .then(() => {
    console.info("Ready to receive requests!");
  })
  .catch((err: Error): void => {
    console.info("Error starting server: ", err.message);
    process.exit(1);
  });
