import User from '../models/User'
import path from 'path'
import ejs from 'ejs'
import mailer from 'nodemailer'

class EmailController {

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
  }

  async renderRecoverPasswordPage(req, res) {
    try {

      const { userId } = req.params

      const user = await User.findById(userId)
      if (!user) return res.status(404).json({ message: 'user not found' });

      res.render('recoverPasswordTemplate.ejs', { email: user.email, recoverPasswordUrl: `${process.env.API_URL}/users/recover-password` });

    } catch (error) {
      console.error(error)
      res.status(400).send(error);
    }
  }

}

export default new EmailController()