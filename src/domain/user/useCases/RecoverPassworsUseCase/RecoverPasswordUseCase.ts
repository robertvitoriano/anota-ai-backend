import { UserRepository } from "../../repositories/UserRepository";
import { IUserCredentials } from "../../types";
import { encodePassword } from "../../../../utils";
class RecoverPasswordUseCase {


  constructor(private userRepository:UserRepository){

  }

  public async execute ({password, email}:IUserCredentials):Promise<void>{

    const user = await this.userRepository.findByCredentials({
      email
    })

    if(user){

      const encodedPassword = await encodePassword(password)

      await this.userRepository.update({
        email, password:encodedPassword
      })
    }
  }
}

export {
  RecoverPasswordUseCase
}