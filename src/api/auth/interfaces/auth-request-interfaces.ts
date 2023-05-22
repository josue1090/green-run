import { BaseRequest } from "../../shared/interfaces/interface";
import { IUser } from "../../users/interfaces/user.interface";

export interface ILoginRequest extends BaseRequest {
  payload: {
    email: string;
    password: string;
  };
}

export interface ISignUpRequest extends BaseRequest {
  payload: IUser;
}
