import jwt, { JwtPayload } from "jsonwebtoken";
import User from '../models/User';
import {NextFunction, Request, Response } from 'express'

interface IDecodedPayload extends JwtPayload {
    _id:string
}

const auth = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const authToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(authToken, process.env.SECRET_KEY ) as IDecodedPayload;
       
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

export default auth