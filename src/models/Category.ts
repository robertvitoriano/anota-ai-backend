import mongoose from 'mongoose';
import { ICategory } from './interfaces';

const Schema = mongoose.Schema

const CategorySchema = new Schema<ICategory>({
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

export default Category