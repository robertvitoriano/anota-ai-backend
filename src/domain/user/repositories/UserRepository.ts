import UserModel from './../../../models/User';
import { IUserRepository } from './IUserRepository'
import { IUser, IUserCredentials } from './../types'
import bcrypt from 'bcryptjs'
class UserRepository implements IUserRepository {

  constructor(private userModel: typeof UserModel) { }
  find({ email, username }: IUserCredentials): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

  async findByCredentials({ email, username, password }: IUserCredentials): Promise<IUser> {

    let user = null

    if (email) {
      user = await this.userModel.findOne({
        email
      })
    }
    if (username) {
      user = await this.userModel.findOne({
        username
      })
    }

    if(!user){
      throw new Error('User Not Found')
    }

    return user
   
  }
}

export { UserRepository }