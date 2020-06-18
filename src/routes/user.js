const express = require('express');
const userController = require('../controllers/user');

const userRouter = express.Router();

//Sign LOG IN
userRouter.post('/users', userController.store);





module.exports = userRouter;