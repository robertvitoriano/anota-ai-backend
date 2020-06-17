const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    authorId:{
        type:Schema.Types.ObjectId,
        // required:true,
        ref:'User'
    }

},{timestamps:true})

const post = mongoose.model('post',Post);

module.exports = post;