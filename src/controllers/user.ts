class UserController {

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