const User = require('../models/User');
const auth = require('../middleware/auth')

module.exports = {
    async store(req, res) {
        const users =  await User.find();
        const emailExists =  users.filter(user=>{user.email===req.body.email});
        if (!emailExists){
            try {
                const user = new User(req.body);
                await user.save();
                const token = await user.generateAuthToken();

                res.status(201).send({
                    token,
                    user
                })

            } catch (e) {
                res.status(400).send(e);
                console.log(e);
            }

        }else{
            res.status(400).send({message:'Email already taken!'});
            console.log('Email already taken');
        }

    },
    async login(req, res) {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken();
            console.log(user);
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
 try {
     const users = await User.find();
       console.log('it works');
     console.log(users);
     res.send(users)
 } catch (error) {
     console.log(error);
 }

      
        }



}


//dfdf

