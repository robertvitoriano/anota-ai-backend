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
            await bcrypt.compare(req.body.password, userExists.password, (error) => {
                return res.send(userExists);

            })
           
        }else{
            if(req.body.name){
                const user = new User({
                    email: req.body.email,
                    password: encPassword,
                    name: req.body.name,
                    username: req.body.username
                })
                await user.save();
                res.send(user);

            }

              console.log("User not found");

        }


    },

}