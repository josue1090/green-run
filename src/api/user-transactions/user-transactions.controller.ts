import { ResponseToolkit } from "hapi";
import { IGetAllUserTransactionsRequest } from "./interfaces/user-transaction-request-interfaces";
import { UserTransactionsService } from "./user-transactions.service";
import { Role } from "../shared/enums/role.enum";

export class UserTransactionsController {
  private readonly userTransactionsService: UserTransactionsService;

  constructor() {
    this.userTransactionsService = new UserTransactionsService();
  }

  async getAll(request: IGetAllUserTransactionsRequest, h: ResponseToolkit) {
    const isAdmin = (request.auth.credentials.scope || []).includes(Role.ADMIN);
    let filter = request.query;

    if (!isAdmin)
      filter = { ...filter, userId: request.auth.credentials.id as any };

    const userTransactions = await this.userTransactionsService.getAll(filter);

    return h.response(userTransactions);
  }
}
