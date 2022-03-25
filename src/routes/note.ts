import {Router}  from 'express';
import noteController  from '../controllers/note';
import auth  from '../middleware/auth';

const notesRouter = Router();

notesRouter.post('/notes', auth, noteController.store)
notesRouter.get('/notes', auth, noteController.index);
notesRouter.post('/notes/:id', auth, noteController.update);
notesRouter.get('/notes/:id', auth, noteController.read);
notesRouter.delete('/notes/:id', auth, noteController.delete);

export default notesRouter;