import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if(!user.password) return

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema);

export default User