import { RecoverPasswordController } from "./RecoverPasswordController";
import { RecoverPasswordUseCase } from "./RecoverPasswordUseCase";
import { userRepository } from "../../repositories/factories/UserRepositoryFactory";

const recoverPasswordUseCase = new RecoverPasswordUseCase(userRepository);
const recoverPasswordController = new RecoverPasswordController(recoverPasswordUseCase);

export {
  recoverPasswordController,
  recoverPasswordUseCase
}