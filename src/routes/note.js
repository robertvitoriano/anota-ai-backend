const noteRouter = require('express').Router();
const noteController = require('../controllers/note');
const auth = require('../middleware/auth')

noteRouter.post('/notes',auth,noteController.store)
noteRouter.get('/notes',auth,noteController.index);
noteRouter.patch('/notes/:id',auth,noteController.update);



module.exports = noteRouter;