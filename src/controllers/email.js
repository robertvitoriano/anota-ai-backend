const User = require('./../models/User')
const {API_URL} = require('./../../config/variables')
module.exports = {

  async renderSignupPage(req, res) {
    try {

      const { userId } = req.params

      const user = await User.findById(userId)


      res.render('signUpTemplate.ejs', { email: user.email, signUpUrl:`${API_URL}/users` });

    } catch (error) {
      console.error(error)
      res.status(400).send(error);
    }
  }



}