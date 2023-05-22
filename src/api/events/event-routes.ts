import { Server } from "@hapi/hapi";

import * as EventValidator from "./event.validator";
import { EventsController } from "./events.controller";
import { ParamsIdValidator } from "../shared/validators/request-validators";

export default function (server: Server) {
  const eventsController = new EventsController();
  server.bind(eventsController);

  // Get all Events
  server.route({
    method: "GET",
    path: "/events",
    options: {
      handler: eventsController.getAll,
      tags: ["api", "Events"],
      description: "Get all events",
      validate: {
        query: EventValidator.getAllEvents,
      },
      auth: "jwt",
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Events fetched.",
            },
          },
        },
      },
    },
  });

  // Create Event
  server.route({
    method: "POST",
    path: "/events",
    options: {
      handler: eventsController.createEvent,
      tags: ["api", "Events"],
      description: "Create an event.",
      validate: {
        payload: EventValidator.createEvent,
      },
      auth: "jwt",
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Event created.",
            },
          },
        },
      },
    },
  });

  // Update Event
  server.route({
    method: "PUT",
    path: "/events/{id}",
    options: {
      handler: eventsController.updateEvent,
      tags: ["api", "Events"],
      description: "Update an event.",
      validate: {
        payload: EventValidator.updateEvent,
        params: ParamsIdValidator,
      },
      auth: "jwt",
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Event created.",
            },
            "401": {
              description: "User does not have authorization.",
            },
          },
        },
      },
    },
  });

  // Delete Event
  server.route({
    method: "DELETE",
    path: "/events/{id}",
    options: {
      handler: eventsController.deleteOne,
      tags: ["api", "Events"],
      description: "Delete an event.",
      validate: {
        params: ParamsIdValidator,
      },
      auth: "jwt",
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Event deleted.",
            },
            "401": {
              description: "User does not have authorization.",
            },
          },
        },
      },
    },
  });

  // Recover Event
  server.route({
    method: "DELETE",
    path: "/events/{id}/recover",
    options: {
      handler: eventsController.recoverOne,
      tags: ["api", "Events"],
      description: "Recover an event.",
      validate: {
        params: ParamsIdValidator,
      },
      auth: "jwt",
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Event recovered.",
            },
            "401": {
              description: "User does not have authorization.",
            },
          },
        },
      },
    },
  });
}
