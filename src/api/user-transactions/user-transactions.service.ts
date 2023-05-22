import UserTransaction from "./entities/user-transaction.entity";
import { UserTransactionFilterParams } from "./interfaces/user-transaction-filter.params";
import { UserTransactionRepository } from "./user-transaction.repository";

export class UserTransactionsService {
  private readonly userTransactionRepository: typeof UserTransactionRepository;

  constructor() {
    this.userTransactionRepository = UserTransactionRepository;
  }

  async getAll(
    filter: UserTransactionFilterParams
  ): Promise<UserTransaction[]> {
    return this.userTransactionRepository.findAll(filter);
  }
}
