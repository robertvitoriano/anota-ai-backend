import path from 'path'
import morgan from 'morgan'
import express from 'express';

import cors from 'cors';

import router from './routes/router';

import { confirmEmailJob } from './jobs/confirmEmailJob'
import { recoverPasswordJob } from './jobs/recoverPasswordJob'
import dotenv from 'dotenv'
dotenv.config()

import './database/connection';

const app = express();

app.use(morgan(":method :url :response-time  :status"))

app.use(cors());

app.get('/', (request, response) => {

    response.json({
        message: 'API is running !'
    })
})

app.set('views', path.join(__dirname + '/views/'));

app.set('view engine', 'ejs');

app.use(express.json());

app.use(router);

confirmEmailJob.start()
recoverPasswordJob.start()

export default app