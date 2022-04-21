import { BeginPasswordRecoveryController } from "./BeginPasswordRecoveryController";
import { BeginPasswordRecoveryUseCase } from "./BeginPasswordRecoveryUseCase";
import { userRepository } from "../../repositories/factories/UserRepositoryFactory";

const beginPasswordRecoveryUseCase = new BeginPasswordRecoveryUseCase(userRepository);
const beginPasswordRecoveryController = new BeginPasswordRecoveryController(beginPasswordRecoveryUseCase);

export {
  beginPasswordRecoveryController,
  beginPasswordRecoveryUseCase
}