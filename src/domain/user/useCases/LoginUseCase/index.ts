import { LoginUseCase } from "./LoginUseCase";
import {LoginController} from './LoginController'
import { userRepository } from "../../repositories/factories/UserRepositoryFactory";

const loginUseCase = new LoginUseCase(userRepository);
const loginController = new LoginController(loginUseCase)

export {
  loginUseCase,
  loginController
}