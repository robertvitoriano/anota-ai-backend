import {Router} from 'express'
import userRouter from './user';
import noteRouter from './note';
import CategoriesRouter from './category'
import emailRouter from './email'

const router = Router()

router.use(emailRouter)
router.use(userRouter);
router.use(noteRouter);
router.use(CategoriesRouter);

export default router