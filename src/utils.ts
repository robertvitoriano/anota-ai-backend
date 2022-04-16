import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
export const generateAuthToken = async (userId:string):Promise<string> =>{
  const token = jwt.sign({ _id: userId }, process.env.SECRET_KEY);
  return token
}

export const encodePassword = async(password: string): Promise<string> => {
  const encodedPassword = await bcrypt.hash(password, 8)
  return encodedPassword
}

