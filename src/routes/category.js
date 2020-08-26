const CategoryRouter = require('express').Router();
const CategoryController = require('./../controllers/category')
const auth = require('./../middleware/auth')

CategoryRouter.use(auth);


CategoryRouter.post('/:userId/create-category',CategoryController.store);