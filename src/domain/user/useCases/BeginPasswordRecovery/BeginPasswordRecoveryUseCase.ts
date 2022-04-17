import { UserRepository } from "../../repositories/UserRepository";
import { IUserCredentials } from "../../types";

class BeginPasswordRecoveryUseCase {


  constructor(private userRepository: UserRepository) { }

  public async execute({ email }: IUserCredentials): Promise<void> {

    const user = this.userRepository.findByCredentials({
      email
    })

    if (user) {
      await this.userRepository.update({
        email,
        isRecoveringPassword: true
      })
    }

  }


}

export {
  BeginPasswordRecoveryUseCase
}