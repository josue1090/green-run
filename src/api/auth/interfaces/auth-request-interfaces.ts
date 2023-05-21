import { BaseRequest } from "../../shared/interfaces/interface";

export interface ILoginRequest extends BaseRequest {
  payload: {
    email: string;
    password: string;
  };
}
