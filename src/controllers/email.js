
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



}