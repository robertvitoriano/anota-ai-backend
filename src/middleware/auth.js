
const jwt = require("jsonwebtoken");
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const authToken = req.headers.userauth;
        // console.log('Esse é o token '+ req.headers.userauth);
        if (!authToken)
           {//fdf

                return res.status(401).json({ msg: "No authentication token, authorization denied." });
           }
//
        // const[,token] =  authToken.split(' ');
        const validToken = jwt.verify(authToken, 'mysecret');
        // console.log(validToken);
        if (!validToken)
            {

                return res.status(401).json({ msg: "Token verification failed, authorization denied." });
            }
            const user = await User.findOne({_id:validToken._id});
            
        console.log(JSON.parse(user));
            if(!user){
                console.log('User not found');
            }
            req.user=user;
           

            next();


    } 
// const jwt = require('jsonwebtoken');
//     const authConfig = require('../config/authConfig.json');

//     module.exports = (req, res, next) => {
//         const authHeader = req.headers.authorization;

//         if (!authHeader)
//             return res.status(401).send({ error: 'No token provided' });

//         const parts = authHeader.split(' ');

//         if (!parts.length === 2)
//             return res.status(401).send({ error: 'Token error' });

//         const [scheme, token] = parts;

//         if (!/^Bearer$/i.test(scheme))
//             return res.status(401).send({ error: 'Token malformatted' });

//         jwt.verify(token, authConfig.secret, (err, decoded) => {
//             if (err) return res.status(401).send({ error: 'Token invalid' });

//             req.userId = decoded.id;

//             return next();
//         })
//     }














    catch (e) {
        res.status(401).json({ErrorMessage:e});
        
    }
};

module.exports = auth;