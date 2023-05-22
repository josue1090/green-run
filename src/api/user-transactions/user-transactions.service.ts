import { UserTransactionRepository } from "./user-transaction.repository";

export class UserTransactionsService {
  private readonly userTransactionRepository: typeof UserTransactionRepository;

  constructor() {
    this.userTransactionRepository = UserTransactionRepository;
  }
}
