const User = require("../models/User");
const auth = require("../middleware/auth");

module.exports = {
  async store(req, res) {
    const users = await User.find();

    const emailExists = users.filter((user) => {
      user.email === req.body.email;
    });

    if (emailExists.length === 0) {
      try {
        const user = new User({ ...req.body, receivedEmail: false });
        await user.save();
        const token = await user.generateAuthToken();

        if (!req.body.password)
          return res.status(201).send({
            token,
            user,
            message:`Em breve um E-mail  de confirmação será  enviado para ${user.email}`
          });
      } catch (e) {
        res.status(400).send(e);
        console.log(e);
      }
    } else {
      res.status(400).send({ message: "Email already taken!" });
      console.log("Email already taken");
    }
  },
  async login(req, res) {
    try {

      const { confirmed, receivedEmail } =  await User.find({email}) 

      if(!receivedEmail) return res.json({message:"Você ainda não recebeu seu e-mail ! Por favor, aguarde mais um pouco."})

      if(!confirmed) return res.json({message:"Você ainda não confirmou seu e-mail ! Assim que confirma-lo, por favor tente novamente."})


      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.status(200).send({
        token,
        user,
      });

      console.log(token);
    } catch (e) {
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

};

//dfdf
