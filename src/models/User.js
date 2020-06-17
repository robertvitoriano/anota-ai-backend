 const mongoose = require('mongoose');
const Schema = mongoose.Schema;


 const User = new Schema({

    username:{
        type:String,
        required:true
    },
     password: {
         type: String,
         required: true
     },
     email: {
         type: String,
         required: true
     },
     name: {
         type: String,
         required: true
     },
     postsId: [{ type: Schema.Types.ObjectId,
               ref:'Post'         
     }],
     comments:[{
         type:String,
         

     }],
     avatar:{
         type:Buffer
     }
    

 },{timestamps:true})




 const user = mongoose.model('user',User);


 module.exports = user;