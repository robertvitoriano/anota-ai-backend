import UserModel from './../../../models/User';
import { IUserRepository } from './IUserRepository'
import { IUser, IUserCredentials } from './../types'
class UserRepository implements IUserRepository {

  constructor(private userModel: typeof UserModel) { }

  async update(data: any): Promise<IUser> {
    const user = await this.userModel.updateOne({
      email: data.email
    }, data)
    return user
  }
  public async createUser(email: string): Promise<IUser> {
    const user = await this.userModel.create({
      email
    })
    await user.save()
    return user
  }

  public async findByCredentials({ email, username, password }: IUserCredentials): Promise<IUser> {

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

    return user

  }
}

export { UserRepository }