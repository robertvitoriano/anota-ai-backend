
const jwt = require("jsonwebtoken");
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization;
        console.log(authToken);
        if (!authToken)
           {

                return res.status(401).json({ msg: "No authentication token, authorization denied." });
           }

        const[,token] =  authToken.split(' ');
        console.log(token);
        const validToken = jwt.verify(token, 'mysecret');
        
        if (!validToken)
            {

                return res.status(401).json({ msg: "Token verification failed, authorization denied." });
            }
            const user = await User.findOne({_id:validToken._id});
            if(!user){
                console.log('User not found');
            }

            req.user=user;

            next();


    } 
    catch (e) {
        res.status(401).json(e);
    }
};

module.exports = auth;