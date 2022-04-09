import { Router } from 'express'
import CategoryController from './../controllers/category'
import auth from './../middleware/auth'

const categoryRouter = Router();
categoryRouter.use(auth)
categoryRouter.post('/categories',CategoryController.store);
categoryRouter.get('/categories', CategoryController.list);
categoryRouter.get('/categories/:categoryId', CategoryController.index);
categoryRouter.post('/categories/:categoryId/associate',CategoryController.associate);
categoryRouter.delete('/categories/:categoryId/remove',CategoryController.remove);

export default categoryRouter