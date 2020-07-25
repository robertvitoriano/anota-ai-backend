const router = require('express').Router();
const userRouter = require('./user');
const noteRouter = require('./note');

router.use(userRouter);
router.use(noteRouter);

module.exports = router;