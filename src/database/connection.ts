import variables from '../../config/variables'

import  mongoose from 'mongoose'

mongoose.set('useCreateIndex', true);
mongoose.connect(variables.default.MONGO_URL,{useNewUrlParser: true,useUnifiedTopology: true}, ()=>{console.log('Im connected to mongodb')});