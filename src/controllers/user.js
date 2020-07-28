const User = require('../models/User');
const auth = require('../middleware/auth')

module.exports = {
    async store(req, res) {
        const user = new User(req.body);
        try {
            await user.save();
            const token = await user.generateAuthToken();

            res.status(201).send({
                token,
                user
            })
            
        } catch (e) {
            res.status(400).send(e);
        }

    },
    async login(req, res) {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken();

            res.send({
                token,
                user
            })

   console.log(token)
            
        } catch (e) {
            res.status(400).send();
        }
    },

    
    async index(req, res) {
        //do middleware auth
        const user = req.user;
            res.send(user);
        }



}


//dfdf

