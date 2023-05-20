import * as Joi from "joi";

/**
 * Joi used to validate node enviroment variables
 */
export const nodeEnvSchema: Joi.ObjectSchema = Joi.object()
  .keys({
    DATABASE_NAME: Joi.string()
      .required(),
    DATABASE_PASSWORD: Joi.string()
      .required(),
    DATABASE_PORT: Joi.string()
      .required(),
    DATABASE_URL: Joi.string()
      .required(),
    DATABASE_USERNAME: Joi.string()
      .required(),
    JWT_SECRET: Joi.string()
      .required(),
    NODE_ENV: Joi.string()
      .required(),
  });

/**
 * Joi used to validate routes that need only the id
 */
export const idSchema: Joi.ObjectSchema = Joi.object()
  .keys({
    id: Joi.string()
      .uuid()
      .required(),
  });

/**
 * Joi used to validate the get many items route
 */
export const getManySchema: Joi.ObjectSchema = Joi.object()
  .keys({
    _end: Joi.string()
      .trim(),
    _order: Joi.string()
      .trim()
      .valid(["ASC"], ["DESC"])
      .required(),
    _sort: Joi.string()
      .trim()
      .required(),
    _start: Joi.string()
      .trim()
      .required(),
  });
