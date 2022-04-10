import { User } from "../../../../models";
import { UserRepository } from "../UserRepository";

const userRepository = new UserRepository(User)

export{
  userRepository
}