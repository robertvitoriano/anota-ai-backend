import bcrypt from 'bcryptjs';
import { IUserRepository } from "../../repositories/IUserRepository";

class FinishSignUpUseCase {
  constructor(private userRepository: IUserRepository) { }

  public async execute({ name, password, username, email }) {
    try {
      const user = await this.userRepository.findByCredentials({ email })

      if (!user) throw new Error('User not signed up !');
      if (user.confirmed) throw new Error('Cadastro já finalizado');

      const encodedPassword = await this.encodePassword(password)

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

  private async encodePassword(password: string): Promise<string> {
    const encodedPassword = await bcrypt.hash(password, 8)
    return encodedPassword
  }
}

export {
  FinishSignUpUseCase
}