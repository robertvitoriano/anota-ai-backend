import emailController from './../controllers/email'

import {Router} from 'express'

const emailRouter = Router()

emailRouter.get('/email/signup/:userId', emailController.renderSignupPage);
emailRouter.get('/email/recover/:userId', emailController.renderRecoverPasswordPage);

export default emailRouter
