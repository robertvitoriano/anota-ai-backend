import User from "../models/User";
import auth from "../middleware/auth";
import { generateAuthToken } from './../utils'

class UserController {
  async store(req, res) {

  }
  async login(req, res) {
    try {
      const {email, password, username} = req.body
     
     if(email){
        const { confirmed, receivedEmail } =  await User.findOne({email})

        if(!receivedEmail) return res.status(500).json({message:"Você ainda não recebeu seu e-mail ! Por favor, aguarde mais um pouco."})

        if(!confirmed) return res.status(500).json({message:"Você ainda não confirmou seu e-mail ! Assim que confirma-lo, por favor tente novamente."})
      
      }
      if(username){
        const { confirmed, receivedEmail } =  await User.findOne({username})

        if(!receivedEmail) return res.status(500).json({message:"Você ainda não recebeu seu e-mail ! Por favor, aguarde mais um pouco."})

        if(!confirmed) return res.status(500).json({message:"Você ainda não confirmou seu e-mail ! Assim que confirma-lo, por favor tente novamente."})
      
      }
      const user = await User.findByCredentials({email, password, username});
      
      const token = await generateAuthToken(user._id.toString());
      res.status(200).send({
        token,
        user,
      });

      console.log(token);
    } catch (e) {
      console.error(e)
      res.status(400).send();
    }
  }

  async index(req, res) {

    try {
      const user = req.user;
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  }
  async logout(req, res) {
    try {
      await req.user.save();
      res.send();
    } catch (error) {
      res.status(500).send();
    }
  }
};

export default new UserController()