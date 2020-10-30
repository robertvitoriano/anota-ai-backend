const  mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb+srv://robertvitoriano:1234@cluster0.btwq6.mongodb.net/anota-ai?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true}, ()=>{console.log('Im connected to mongodb')});