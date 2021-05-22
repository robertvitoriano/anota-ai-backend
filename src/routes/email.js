const emailController = require('./../controllers/email')

const emailRouter = require('express').Router()



emailRouter.patch('/email/confirmation/:userId', emailController.confirmEmail);

emailRouter.get('/email/signup/:userId', emailController.renderSignupPage);

module.exports =  emailRouter
