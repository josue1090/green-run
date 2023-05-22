import UserTransaction from "./entities/user-transaction.entity";
import { UserTransactionFilterParams } from "./interfaces/user-transaction-filter.params";
import { UserTransactionRepository } from "./user-transaction.repository";
import { IUserTransaction } from "./interfaces/user-transaction.interface";
import { UserTransactionCategory } from "./enums/user-transaction-category.enum";

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

  async createDepositTransaction(
    userId: number,
    amount: number
  ): Promise<UserTransaction> {
    const payload: IUserTransaction = {
      amount,
      category: UserTransactionCategory.DEPOSIT,
      userId,
    };
    const userTransaction = this.userTransactionRepository.create(payload);
    return userTransaction.save();
  }
}
