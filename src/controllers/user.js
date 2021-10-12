const User = require("../models/User");
const auth = require("../middleware/auth");

module.exports = {
  async store(req, res) {


  try{

    console.log('REQUEST ', req.body)

    const users = await User.find();

    const emailExists = users.filter((user) => {
      user.email === req.body.email;
    });

    console.log('verificando existencia de email')

    if (emailExists.length === 0) {
        const user = new User({ ...req.body, receivedEmail: false });
        await user.save();
        const token = await user.generateAuthToken();
        console.log('gerando token caso usuario não exista')

        if (!req.body.password)
          return res.status(201).send({
            token,
            user,
            message:`Em breve um E-mail  de confirmação será  enviado para ${user.email}`
          });

          

    } else {
      res.status(400).send({ message: "Email already taken!" });
      console.log("Email already taken");
    }
  }catch(e){
    console.error(e);
    return res.status(400).send(e);
  
  }
  },
  async login(req, res) {
    try {
      const {email, password} = req.body

      const { confirmed, receivedEmail } =  await User.findOne({email}) 


      if(!receivedEmail) return res.status(500).json({message:"Você ainda não recebeu seu e-mail ! Por favor, aguarde mais um pouco."})

      if(!confirmed) return res.status(500).json({message:"Você ainda não confirmou seu e-mail ! Assim que confirma-lo, por favor tente novamente."})


      const user = await User.findByCredentials(
        email,
        password
      );
      const token = await user.generateAuthToken();
      res.status(200).send({
        token,
        user,
      });

      console.log(token);
    } catch (e) {
      console.error(e)
      res.status(400).send();
    }
  },

  async index(req, res) {
    //do middleware auth
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      console.log(error);
    }
  },
  async logout(req, res) {
    try {
      console.log(req.body.headers);
      auth = "apagado";
      await req.user.save();
      res.send();
    } catch (error) {
      res.status(500).send();
    }
  },

  async finishSignUp (req, res){

    try {
      
      const {name, password, username, email} = req.body
      const user = await User.findOne({email});

      if(!user) return res.status(400).json({message:'Usuario não cadastrado'});
      if(user.confirmed) return res.status(400).json({message:'Cadastro já finalizado'});

  
      user.username = username
      user.password = password
      user.name = name
      user.confirmed = true
  
      await user.save()

    return res.status(201).json({message:'Cadastro Finalizado com sucesso'});

    } catch (error) {

      console.error(error)
      
    }



  }

};

//dfdf
