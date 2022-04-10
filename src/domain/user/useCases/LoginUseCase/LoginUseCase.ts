import { IUserRepository } from './../../repositories/IUserRepository'
import { IUserCredentials, IUser } from './../../types'
import { generateAuthToken } from './../../../../utils'
import bcrypt from 'bcryptjs'
class LoginUseCase {
  constructor(private userRepository: IUserRepository) { }

  public async execute({ email, username, password }: IUserCredentials): Promise<{ user: IUser, token: string }> {
    const user = await this.userRepository.findByCredentials({
      email,
      username,
      password
    })

    if (!user) throw new Error('Unable to login !')
    const { receivedEmail, confirmed } = user

    if (!receivedEmail) throw new Error("We could not send your e-mail yet, please wait more.")
    if (!confirmed) throw new Error("You did not confirm your e-mail yet ! Please, try again as soon as you confirm it !")

    const token = await generateAuthToken(user._id)

    if (!token) throw new Error('Unable to login !')

    const isPasswordValid = this.verifyPassword({ password, userInstanceEndcodedPassword: user.password })

    if (!isPasswordValid) throw new Error('Unable to login !')

    return { user, token }

  }

  private async verifyPassword({ password, userInstanceEndcodedPassword }) {
    const isMatch = await bcrypt.compare(password, userInstanceEndcodedPassword);
    return isMatch
  }
}

export {
  LoginUseCase
}