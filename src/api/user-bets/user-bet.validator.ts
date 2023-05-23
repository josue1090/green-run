import * as Joi from "joi";
import { BetResult } from "../shared/enums/bet-result.enum";
import { UserBetsStatus } from "./enums/user-bets-status.enum";

export const getAllUserBet = Joi.object().keys({
  userId: Joi.number().positive(),
  betId: Joi.number().positive(),
});

export const createUserBet = Joi.object().keys({
  betId: Joi.number().positive().required(),
  odd: Joi.number().positive().required(),
  amount: Joi.number().positive().required(),
});

export const updateUserBet = Joi.object().keys({
  betId: Joi.number().positive(),
  odd: Joi.number().positive(),
  result: Joi.string().valid(...Object.values(BetResult)),
  amount: Joi.number().positive(),
  status: Joi.string().valid(...Object.values(UserBetsStatus)),
});
