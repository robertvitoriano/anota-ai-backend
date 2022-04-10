import { UserRepository } from "../../repositories/UserRepository";
import { LoginUseCase } from "./LoginUseCase";
import {LoginController} from './LoginController'
import { User as UserModel } from "../../../../models";

const userRepository = new UserRepository(UserModel);
const loginUseCase = new LoginUseCase(userRepository);
const loginController = new LoginController(loginUseCase)

export {
  loginUseCase,
  loginController
}