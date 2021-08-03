const mongoose = require('mongoose');
const Schema = mongoose.Schema


const CategorySchema = new Schema({
   name:{
       type:String,
       required:true
   },

    notesId:[{
        type:Schema.Types.ObjectId,
        ref:'notes'
    }],
    authorId:{
        type:Schema.Types.ObjectId
    }
},{
    timestamps:true
})

const Category = mongoose.model('category',CategorySchema);

module.exports =  Category;