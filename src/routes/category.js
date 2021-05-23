const CategoryRouter = require('express').Router();
const CategoryController = require('./../controllers/category')
const auth = require('./../middleware/auth')



CategoryRouter.post('/:userId/categories',auth,CategoryController.store);
CategoryRouter.get('/:userId/categories',auth, CategoryController.list);
CategoryRouter.get('/:userId/categories/:categoryId',auth, CategoryController.index);
CategoryRouter.post('/categories/:categoryId/associate',auth,CategoryController.associate);
CategoryRouter.patch('/categories/:categoryId/remove',auth,CategoryController.remove);


module.exports = CategoryRouter;


