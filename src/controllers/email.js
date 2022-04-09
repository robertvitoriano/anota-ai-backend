const User = require('./../models/User')
const path = require('path')
const ejs = require('ejs')

module.exports = {

  async renderSignupPage(req, res) {
    try {

      const { userId } = req.params

      const user = await User.findById(userId)
      if (!user) return res.status(404).json({ message: 'user not found' });


      res.render('signUpTemplate.ejs', { email: user.email, signUpUrl: `${process.env.API_URL}/users` });

    } catch (error) {
      console.error(error)
      res.status(400).send(error);
    }
  },

  async sendRecoverEmail(req, res) {
    try {

      const { email } = req.body

      const user = User.find((user)=>user.email === email)
      const token = user.generateAuthToken()
      
      console.log(`Trying to send Email to ${email}`)


      const transporter = mailer.createTransport({
        host:HOST,
        port: 465,
        secure: true,
        auth: {
          user: EMAIL,
          pass: EMAIL_PASSWORD
        }
      });

      ejs.renderFile(path.join(__dirname, '../views/', "recoverPasswordEmailTemplate.ejs"), { recoverUrl: `${process.env.API_URL}/email/recover/${token}` }, (err, data) => {

        if (err) return console.error(err);

        transporter.sendMail({
          from: process.env.EMAIL,
          to: email,
          subject: 'Redefina sua Senha',
          text: 'Redefina sua senha',
          html: String(data)
        }, async (error, info) => {

          if (error) {
            return console.error(error);
          }

          console.log(`Email sent to ${user.email}`)

        })


      });

    } catch (error) {
      console.error(error)
      res.status(400).send(error);
    }
  }



}