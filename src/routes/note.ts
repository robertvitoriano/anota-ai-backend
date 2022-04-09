import {Router } from 'express';
import noteController from '../controllers/note';
import auth from '../middleware/auth';

const noteRouter = Router()

noteRouter.post('/notes', auth, noteController.store)
noteRouter.get('/notes', auth, noteController.index);
noteRouter.post('/notes/:id', auth, noteController.update);
noteRouter.get('/notes/:id', auth, noteController.read);
noteRouter.delete('/notes/:id', auth, noteController.delete);

export default noteRouter