const jwt = require("jsonwebtoken");
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const authToken = req.headers.userauth;
        const decoded = jwt.verify(authToken, 'mysecret');
        const user = await User.findOne({ _id: decoded._id });

         if(!user){
             res.status(401).json({ ErrorMessage: 'User not found' });

         }
        req.token = authToken;
        req.user = user;


        next();


    }

    catch (e) {
        res.status(401).json({ ErrorMessage: e });

    }
};

module.exports = auth;