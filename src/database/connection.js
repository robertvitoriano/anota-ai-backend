const  mongoose = require('mongoose');

mongoose.connect("mongodb+srv://robertvitoriano:961862194@cluster0-btwq6.mongodb.net/cria_blog?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
},()=>{console.log('Im connected to mongodb')});