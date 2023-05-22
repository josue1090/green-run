import { Server, ServerApplicationState } from "@hapi/hapi";

type registerSwaggerPlugin = (
  server: Server
) => Promise<ServerApplicationState>;

export const registerSwaggerPlugin = async (
  server: Server
): Promise<ServerApplicationState> => {
  return server.register([
    require("@hapi/inert"),
    require("@hapi/vision"),
    {
      plugin: require("hapi-swagger"),
      options: {
        info: {
          title: "Green Run Api",
          description: "Green Run Api Documentation",
          version: "1.0",
        },
        tags: [
          {
            name: "auth",
            description: "Api authentication interface",
          },
        ],
        securityDefinitions: {
          jwt: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
          },
        },
        security: [{ jwt: [] }],
        schemes: ["http", "https"],
        swaggerUI: true,
        documentationPage: true,
        documentationPath: "/api-docs",
      },
    },
  ]);
};
