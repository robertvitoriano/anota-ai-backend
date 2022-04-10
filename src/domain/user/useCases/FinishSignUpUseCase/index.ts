import { FinishSignUpController } from "./FinishSignUpController";
import { FinishSignUpUseCase } from "./FinishSignUpUseCase";
import { userRepository } from "../../repositories/factories/UserRepositoryFactory";

const finishSignUpUseCase = new FinishSignUpUseCase(userRepository);
const finishSignUpController = new FinishSignUpController(finishSignUpUseCase);

export {
  finishSignUpController,
  finishSignUpUseCase
}