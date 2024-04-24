const mongoose = require('mongoose')
const {hashPassword} = require('../../Helpers/Hashing')

const User = mongoose.Schema({
    username : {
        type : 'string' ,
        required : true
    },
    email : {
        type: 'string' ,
        required : true ,
        unique : true
    },
    password : {
        type : 'string' ,
        required : true
    },
    age : {
        type: 'Number'
    },
    clientAddress: {
        type : 'String',
        required : true
    },
    sex : {
        type: 'String' ,
        enum: ['male', 'female'] 
    },
    phoneNumber : {
        type: 'Number'
    },
    bio : {
        type: 'String'
    },
    verified : {
        type : 'Boolean' ,
        default : false
    } ,
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    googleId: {
        type: String // Stocker l'ID Google de l'utilisateur
    },
    googleAccessToken: {
        type: String // Stocker le jeton d'authentification Google de l'utilisateur
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

/*
User.pre('save', async function(next) {
    // Check if password field is modified and is new
    if (!this.isModified('password') || !this.isNew) {
        return next();
    }

    try {
        const hashedPassword = await hashPassword(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

/*
//pre-save to hash password before saving
User.pre('save', async function(next) {
    // Only hash the password if it's modified or new
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const hashedPassword = await hashPassword(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
})
*/
module.exports = mongoose.model('users',User)