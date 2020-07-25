const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Note = new Schema({
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

const note = mongoose.model('note',Note);

module.exports = note;