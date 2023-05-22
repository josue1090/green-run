import * as Joi from "joi";
import { EventSport } from "./enums/event-sports.enum";
import { EventStatus } from "../shared/enums/event-status.enum";
import { EventScore } from "./enums/event-score.enum";

export const getAllEvents = Joi.object().keys({
  status: Joi.string().valid(...Object.values(EventStatus)),
});

export const createEvent = Joi.object().keys({
  firstTeam: Joi.string().required(),
  secondTeam: Joi.string().required(),
  sport: Joi.string()
    .valid(...Object.values(EventSport))
    .required(),
  status: Joi.string()
    .valid(...Object.values(EventStatus))
    .required(),
  score: Joi.string().valid(...Object.values(EventScore)),
});

export const updateEvent = Joi.object().keys({
  firstTeam: Joi.string(),
  secondTeam: Joi.string(),
  sport: Joi.string().valid(...Object.values(EventSport)),
  status: Joi.string().valid(...Object.values(EventStatus)),
  score: Joi.string().valid(...Object.values(EventScore)),
});
