import emailController from './../controllers/email'

import { Router } from 'express'

const emailRouter = Router()

emailRouter.get('/email/signup/:userId', emailController.renderSignupPage);
emailRouter.post('/email/recover', emailController.sendRecoverEmail);

export default  emailRouter
