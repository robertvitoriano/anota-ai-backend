const express = require('express');
const userController = require('../controllers/user');
const userRouter = express.Router();
const auth = require('../middleware/auth')


//Sign LOG IN
userRouter.post('/users', userController.store);
userRouter.post('/users/login', userController.login);
userRouter.get('/users/me', auth, userController.index);
userRouter.get('/users', userController.index);
userRouter.post('/users/logout', userController.logout);
userRouter.patch('/users', userController.finishSignUp);


module.exports = userRouter; 

