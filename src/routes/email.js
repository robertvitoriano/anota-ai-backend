const emailController = require('./../controllers/email')

const EmailRouter = require('express').Router()



EmailRouter.post('email/confirmation/:userId', emailController.confirmEmail);

EmailRouter.get('email/signup/:userId', emailController.renderSignupPage);
