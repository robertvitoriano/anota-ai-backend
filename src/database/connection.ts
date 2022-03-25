import {MONGO_URL} from './../../config/variables'

import  mongoose from 'mongoose'
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGO_URL,{useNewUrlParser: true,useUnifiedTopology: true}, ()=>{console.log('Im connected to mongodb')});