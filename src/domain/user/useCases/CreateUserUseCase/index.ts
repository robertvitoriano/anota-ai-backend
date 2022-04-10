import { CreateUserController} from "./CreateUserController";
import {CreateUserUseCase} from './CreateUserUseCase'
import { userRepository } from "../../repositories/factories/UserRepositoryFactory";

const createUserUseCase = new CreateUserUseCase(userRepository)

const createUserController = new CreateUserController(createUserUseCase)

export {
  createUserUseCase,
  createUserController
}