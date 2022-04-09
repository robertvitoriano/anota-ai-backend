import  mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,useUnifiedTopology: true}, ()=>{console.log('Im connected to mongodb')});