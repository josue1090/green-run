import { BaseRequest } from "../../shared/interfaces/interface";
import { IUser } from "./user.interface";

export interface ICreateUserUserRequest extends BaseRequest {
  payload: IUser;
}

export interface IUpdateUserRequest extends BaseRequest {
  params: {
    id: number;
  };
  payload: Partial<IUser> & {
    id: number;
  };
}
