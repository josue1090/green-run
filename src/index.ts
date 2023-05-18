import * as Boom from "@hapi/boom";
import { Request, ResponseObject, ResponseToolkit, Server } from "@hapi/hapi";
import { validate, ValidationError } from "@hapi/joi";
import * as Dotenv from "dotenv";
// tslint:disable-next-line: no-import-side-effect
import "reflect-metadata";
import { createConnection, DataSource } from "typeorm";

import { BaseServer } from "./common/interface";
import { nodeEnvSchema } from "./common/validate";
import { init } from "./server";

type connectToDatabase = (server: BaseServer) => Promise<Connection>;
type preResponse = (request: Request, h: ResponseToolkit) => symbol;
type start = () => Promise<void>;
type loadEnvs = () => Dotenv.DotenvParseOutput;



/**
 * Prints all unhandled errors on the screen.
 */
const preResponse: preResponse = (
  request: Request,
  h: ResponseToolkit,
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
  if (dotenvConfigOutput.error !== undefined || dotenvConfigOutput.parsed === undefined) {
    throw dotenvConfigOutput.error;
  }
  const { parsed: envs } = dotenvConfigOutput;
  validate(envs, nodeEnvSchema, (error: ValidationError | null) => {
    if (error !== null) {
      throw error;
    }
  });

  return envs;
};

/**
 * Starts hapi server, loads environment variables and connects to the database
 */
const start: start = async (): Promise<void> => {
  const server: Server = await init();

  server.ext("onPreResponse", preResponse);
  server.app = loadEnvs();
  await connectToDatabase(server as BaseServer);
  console.info("Connected to database!");

  await server.start();
};

start()
  .then(() => {
    console.info("Ready to receive requests!");
  })
  .catch(
    (err: Error): void => {
      console.info("Error starting server: ", err.message);
      process.exit(1);
    },
  );
