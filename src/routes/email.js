const emailController = require('./../controllers/email')

const emailRouter = require('express').Router()


emailRouter.get('/email/signup/:userId', emailController.renderSignupPage);
emailRouter.post('/email/recover', emailController.sendRecoverEmail);

module.exports =  emailRouter
