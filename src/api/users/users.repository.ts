import AppDataSource from "../../db/data-source";
import User from "./entities/user.entity";

export const UsersRepository = AppDataSource.getRepository(User);
