const postRouter = require('express').Router();
const postController = require('../controllers/post');

postRouter.post('/posts',postController.store)
postRouter.get('/posts',postController.index);



module.exports = postRouter;