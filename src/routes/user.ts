import { Router, Response, Request } from 'express'
import { loginController } from './../domain/user/useCases/LoginUseCase';
import { createUserController } from './../domain/user/useCases/CreateUserUseCase'
import { finishSignUpController } from './../domain/user/useCases/FinishSignUpUseCase'
import userController from './../controllers/user'
import auth from '../middleware/auth'

const userRouter = Router()
//Sign LOG IN
userRouter.post('/users', (request: Request, response: Response) =>
  createUserController.handle(request, response));
userRouter.post('/users/login', (request: Request, response: Response) =>
  loginController.handle(request, response));
userRouter.get('/users/me', auth, userController.index);
userRouter.get('/users', userController.index);
userRouter.post('/users/logout', userController.logout);
userRouter.patch('/users', (request: Request, response: Response) =>
  finishSignUpController.handle(request, response));

export default userRouter

