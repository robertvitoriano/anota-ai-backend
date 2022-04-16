import { IUserRepository } from "../../repositories/IUserRepository";
import { encodePassword } from "./../../../../utils";
class FinishSignUpUseCase {
  constructor(private userRepository: IUserRepository) { }

  public async execute({ name, password, username, email }) {
    try {
      const user = await this.userRepository.findByCredentials({ email })

      if (!user) throw new Error('User not signed up !');
      if (user.confirmed) throw new Error('Cadastro já finalizado');

      const encodedPassword = await encodePassword(password)

      await this.userRepository.update({
        name,
        password: encodedPassword,
        username,
        email,
        confirmed: true
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export {
  FinishSignUpUseCase
}