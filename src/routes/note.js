const noteRouter = require('express').Router();
const noteController = require('../controllers/note');
const auth = require('../middleware/auth');

noteRouter.post('/notes', auth, noteController.store)
noteRouter.get('/notes', auth, noteController.index);
noteRouter.post('/notes/:id', auth, noteController.update);
noteRouter.get('/notes/:id', auth, noteController.read);
noteRouter.delete('/notes/:id', auth, noteController.delete);

module.exports = noteRouter;