import express from 'express';
import userController  from '../controllers/user';
import auth from '../middleware/auth'
const userRouter = express.Router();

//Sign LOG IN
userRouter.post('/users', userController.store);
userRouter.post('/users/login', userController.login);
userRouter.get('/users/me', auth, userController.index);
userRouter.get('/users', userController.index);
userRouter.post('/users/logout', userController.logout);
userRouter.patch('/users', userController.finishSignUp);

export default userRouter; 

