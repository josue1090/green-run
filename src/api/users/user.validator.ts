import * as Joi from "joi";

import { UserState } from "./enums/user-state.enum";
import { Role } from "../shared/enums/role.enum";

export const createUser = Joi.object().keys({
  role: Joi.string()
    .valid(...Object.values(Role))
    .required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().trim().required(),
  username: Joi.string().trim().required(),
  address: Joi.string(),
  gender: Joi.string(),
  birthDate: Joi.date(),
  country: Joi.string(),
  city: Joi.string(),
  category: Joi.string(),
  documentNumber: Joi.string(),
  userState: Joi.string().valid(...Object.values(UserState)),
});
