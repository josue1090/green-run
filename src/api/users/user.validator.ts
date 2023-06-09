import * as Joi from "joi";

import { UserStatus } from "./enums/user-state.enum";
import { Role } from "../shared/enums/role.enum";

export const updateUser = Joi.object().keys({
  role: Joi.string().valid(...Object.values(Role)),
  firstName: Joi.string(),
  lastName: Joi.string(),
  phone: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().trim(),
  username: Joi.string().trim(),
  address: Joi.string(),
  gender: Joi.string(),
  birthDate: Joi.date(),
  country: Joi.string(),
  city: Joi.string(),
  category: Joi.string(),
  documentNumber: Joi.string(),
  status: Joi.string().valid(...Object.values(UserStatus)),
});

export const deposit = Joi.object().keys({
  amount: Joi.number().positive().required(),
});

export const withdraw = deposit;
