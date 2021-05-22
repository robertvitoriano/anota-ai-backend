const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: false,
        trim: true
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

//acessível em instancia
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'mysecret');
    await user.save();
    return token
}
//Acessível através do model
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

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

module.exports = User