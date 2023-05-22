import * as Joi from "joi";
import { EventStatus } from "../shared/enums/event-status.enum";
import { BetResult } from "../shared/enums/bet-result.enum";

export const getAllBets = Joi.object().keys({
  status: Joi.string().valid(...Object.values(EventStatus)),
});

export const createBet = Joi.object().keys({
  option: Joi.number(),
  status: Joi.string().valid(...Object.values(EventStatus)),
  name: Joi.string().required(),
  odd: Joi.number().positive().required(),
  result: Joi.string().valid(...Object.values(BetResult)),
  eventId: Joi.number().positive().required(),
});

export const updateBet = Joi.object().keys({
  option: Joi.number(),
  status: Joi.string().valid(...Object.values(EventStatus)),
  name: Joi.string(),
  odd: Joi.number().positive(),
  result: Joi.string().valid(...Object.values(BetResult)),
  eventId: Joi.number().positive(),
});
