const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async store(req, res) {
        let encPassword = null;
        bcrypt.hash(req.body.password, 2).then((data) => {
            encPassword = data
        }).catch(e => {
            console.log("It could not encrypt");
        })
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.send(userExists);
        }
        const user = new User({
            email: req.body.email,
            password: encPassword,
            name: req.body.name,
            username: req.body.username
        })
        await user.save();
        console.log(user);
        res.send(user);
    },

    async read(req, res) {
       
        const user = await User.findOne({ email: req.body.email });
              if(!user){
                  console.log('User not found');
              }
              await bcrypt.compare(req.body.password, user.password, (error) => {
        
                res.send(user)
            
        })
      


    }
}