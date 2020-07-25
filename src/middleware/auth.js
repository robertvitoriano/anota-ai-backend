
const jwt = require("jsonwebtoken");
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const authToken = req.headers.userauth;
        if (!authToken)
           {

                return res.status(401).json({ msg: "No authentication token, authorization denied." });
           }

        // const[,token] =  authToken.split(' ');
        const validToken = jwt.verify(authToken, 'mysecret');
        
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
        res.status(401).json({ErrorMessage:e});
        
    }
};

module.exports = auth;