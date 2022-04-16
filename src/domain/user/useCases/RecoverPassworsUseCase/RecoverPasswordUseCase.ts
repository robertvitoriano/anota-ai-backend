import { UserRepository } from "../../repositories/UserRepository";
import { IUserCredentials } from "../../types";
import bcrypt from 'bcrypt'
import { encodePassword } from "../../../../utils";
class RecoverPasswordUseCase {


  constructor(private userRepository:UserRepository){

  }

  public async execute ({password, email}:IUserCredentials):Promise<void>{

    const user = this.userRepository.findByCredentials({
      email
    })

    if(user){

      const encodedPassword = await encodePassword(password)

      await this.userRepository.updatePassword({
        email, password:encodedPassword
      })
    }





  }


}

export {
  RecoverPasswordUseCase
}