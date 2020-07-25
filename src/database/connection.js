const  mongoose = require('mongoose');

mongoose.connect(process.env.Mongo_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
},()=>{console.log('Im connected to mongodb')});
//85