const CategoryRouter = require('express').Router();
const CategoryController = require('./../controllers/category')
const auth = require('./../middleware/auth')

CategoryRouter.use(auth);


CategoryRouter.post('/:userId/categories',CategoryController.store);
CategoryRouter.get('/:userId/categories', CategoryController.list);
CategoryRouter.get('/:userId/categories/:categoryId', CategoryController.index);
CategoryRouter.post('/categories/:categoryId/associate', CategoryController.associate);
CategoryRouter.patch('/categories/:categoryId/remove', CategoryController.remove);


module.exports = CategoryRouter;


