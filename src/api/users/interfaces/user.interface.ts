import { Role } from "../../shared/enums/role.enum";
import { IBaseRecord } from "../../shared/interfaces/base-record.interface";
import { UserStatus } from "../enums/user-state.enum";

export interface IUser extends IBaseRecord {
  role: Role;
  firstName: string;
  lastName?: string;
  phone?: string;
  email: string;
  password: string;
  username: string;
  address?: string;
  gender?: string;
  birthDate?: Date;
  country?: string;
  city?: string;
  category?: string;
  documentNumber?: string;
  status?: UserStatus;
}
