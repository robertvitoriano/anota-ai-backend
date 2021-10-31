const  { SECRET_KEY } = require('./../../config/variables')
const jwt = require("jsonwebtoken");
const User = require('../models/User');


const auth = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(authToken, SECRET_KEY );
        const user = await User.findOne({ _id: decoded._id });

         if(!user){
             res.status(401).json({ ErrorMessage: 'User not found' });
         }
        req.token = authToken;
        req.user = user;
        
        next();
    }catch (e) {
        res.status(401).json({ ErrorMessage: e });
    }
};

module.exports = auth;