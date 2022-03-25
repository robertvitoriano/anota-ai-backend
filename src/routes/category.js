const CategoryRouter = require('express').Router();
const CategoryController = require('./../controllers/category')
const auth = require('./../middleware/auth')
CategoryRouter.use(auth)
CategoryRouter.post('/categories',CategoryController.store);
CategoryRouter.get('/categories', CategoryController.list);
CategoryRouter.get('/categories/:categoryId', CategoryController.index);
CategoryRouter.post('/categories/:categoryId/associate',CategoryController.associate);
CategoryRouter.delete('/categories/:categoryId/remove',CategoryController.remove);

module.exports = CategoryRouter;


