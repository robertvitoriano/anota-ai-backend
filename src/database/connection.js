const {MONGO_URL} =  require('./../../config/variables')

const  mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

mongoose.connect(MONGO_URL,{useNewUrlParser: true,useUnifiedTopology: true}, ()=>{console.log('Im connected to mongodb')});