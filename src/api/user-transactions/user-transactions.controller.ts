import { ResponseToolkit } from "hapi";
import { IGetAllUserTransactionsRequest } from "./interfaces/user-transaction-request-interfaces";
import { UserTransactionsService } from "./user-transactions.service";

export class UserTransactionsController {
  private readonly userTransactionsService: UserTransactionsService;

  constructor() {
    this.userTransactionsService = new UserTransactionsService();
  }

  async getAll(request: IGetAllUserTransactionsRequest, h: ResponseToolkit) {
    const userTransactions = await this.userTransactionsService.getAll(
      request.query
    );

    return h.response(userTransactions);
  }
}
