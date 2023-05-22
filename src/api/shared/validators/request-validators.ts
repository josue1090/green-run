import * as Joi from "joi";

export const ParamsIdValidator = Joi.object({
  id: Joi.number().required(),
});
