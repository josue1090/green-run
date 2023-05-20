import * as Joi from "joi";

export const login = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().trim().required(),
});

export const jwtValidator = Joi.object({
  authorization: Joi.string().required(),
}).unknown();
