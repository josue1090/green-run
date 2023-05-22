import * as Joi from "joi";
import { UserTransactionCategory } from "./enums/user-transaction-category.enum";

export const getAllUserTransactions = Joi.object().keys({
  userId: Joi.number().positive(),
  category: Joi.string().valid(...Object.values(UserTransactionCategory)),
});
