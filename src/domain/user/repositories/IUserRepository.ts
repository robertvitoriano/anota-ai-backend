import { IUser } from "./../types"
import { IUserCredentials } from "../types";

export interface IUserRepository {
  findByCredentials({ email, username }: IUserCredentials): Promise<IUser>
  update(data:any): Promise<IUser>
}