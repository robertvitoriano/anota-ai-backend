const express = require('express');
const userController = require('../controllers/user');

const userRouter = express.Router();

//Sign up
userRouter.post('/users', userController.store);

//Log in
userRouter.get('/users',userController.read);



module.exports = userRouter;