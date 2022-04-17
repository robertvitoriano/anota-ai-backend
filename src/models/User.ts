import mongoose from 'mongoose'
import validator from 'validator'
import {IUserModel} from './interfaces'
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema<IUserModel>({

    username: {  
        type: String,
        required: false,
        trim: true,
        unique: true
    },
    confirmed:{
        type: Boolean,
        required: false,
        default:false
    }
    ,
    name: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    receivedEmail:{
        type:Boolean,
        required: true,
        default:false
    },
    isRecoveringPassword:{
        type:Boolean,
        required: true,
        default:false
    },
    emailAttempts:{
     type:Number,
     required:false,
     default:0
    },
    password: {
        type: String,
        required: false
    },
    notesId: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }],
    categoriesId: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
},
    {
        timestamps: true
    })

const User = mongoose.model('User', userSchema);

export default User