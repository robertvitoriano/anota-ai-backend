
module.exports = {

  async renderSignupPage(req, res) {
    try {
      ejs.renderFile(path.join(__dirname, './views/', "signupTemplate.ejs"), {students: students}, (err, data) => {

        if (err) return res.send(err);
        
        res.sendFile(path.resolve(`${__dirname}/views/index.html`))

      })

    } catch (error) {
    res.status(400).send(error);
  }
},

async confirmEmail(){

  const { userId } = req.params

  try{
    const user = await User.findById(userId)

    if(user.confirmed) return res.status(409).send.json({message:"Você já confirmou esse e-mail. Va em frente e faça seu login !"})
  
    user.confirmed = true
  
    await user.save()
  
    res.send.json({message:"Email confirmado com sucesso !"})
    
  }catch(error){

    throw new Error(error)
  }
 



}



}