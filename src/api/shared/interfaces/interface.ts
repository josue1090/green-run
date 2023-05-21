import { Request, Server } from "@hapi/hapi";

export interface NodeEnvs {
  DATABASE_NAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_PORT: string;
  JWT_EXPIRATION: string;
  DATABASE_URL: string;
  DATABASE_USERNAME: string;
  JWT_SECRET: string;
  NODE_ENV: string;
}

export interface BaseServer extends Server {
  app: NodeEnvs;
}

export interface BaseRequest extends Request {
  server: BaseServer;
}

export interface IdParamRequest extends Request {
  params: {
    id: string;
  };
}
