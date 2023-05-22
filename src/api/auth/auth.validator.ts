import * as Joi from "joi";
import { Role } from "../shared/enums/role.enum";
import { UserState } from "../users/enums/user-state.enum";

export const login = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().trim().required(),
});

export const signUp = Joi.object().keys({
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
  userState: Joi.string()
    .valid(...Object.values(UserState))
});

export const jwtValidator = Joi.object({
  authorization: Joi.string().required(),
}).unknown();
