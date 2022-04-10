import jwt from 'jsonwebtoken'

export const generateAuthToken = async (userId:string):Promise<string> =>{
  const token = jwt.sign({ _id: userId }, process.env.SECRET_KEY);
  return token
}

