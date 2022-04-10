import { UserRepository } from "../../repositories/UserRepository";
import { generateAuthToken } from './../../../../utils'

class CreateUserUseCase {
  constructor(private userRepository: UserRepository) { }
  async execute(email: string) {

    const userExists = !!(await this.userRepository.findByCredentials({ email }))

    if (userExists) throw new Error('Email not available !')

    console.log('verificando existencia de email')

    const user = await this.userRepository.createUser(email);

    const token = await generateAuthToken(user._id.toString());

    if (!token) throw new Error('Unable to create user !')

    console.log('gerando token caso usuario não exista')

    return {
      token,
      user,
      message: `Em breve um E-mail  de confirmação será  enviado para ${user.email}`
    };
  }
}

export {
  CreateUserUseCase
}