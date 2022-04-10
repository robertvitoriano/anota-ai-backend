import mongoose from 'mongoose';
import { INote } from './interfaces';

const Schema = mongoose.Schema;

const Note = new Schema<INote>({
    
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
        required:true,
        ref:'User'
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        default:null
    }
},{timestamps:true})

const note = mongoose.model('note',Note);

export default note;