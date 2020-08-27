const router = require('express').Router();
const userRouter = require('./user');
const noteRouter = require('./note');
const CategoriesRouter = require('./category')

router.use(userRouter);
router.use(noteRouter);
router.use(CategoriesRouter);

module.exports = router;