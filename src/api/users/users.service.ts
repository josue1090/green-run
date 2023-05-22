import * as Boom from "@hapi/boom";

import User from "./entities/user.entity";
import { IUser } from "./interfaces/user.interface";
import { UsersRepository } from "./users.repository";

export class UsersService {
  private readonly usersRepository: typeof UsersRepository;

  constructor() {
    this.usersRepository = UsersRepository;
  }

  async create(userPayload: IUser): Promise<User> {
    const user = await this.usersRepository.create(userPayload);
    return this.usersRepository.save(user);
  }

  async update(id: number, userUpdatePayload: Partial<IUser>): Promise<User> {
    const user = await this.findById(id);
    this.usersRepository.merge(user, userUpdatePayload);
    return user.save();
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw Boom.notFound();

    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
