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
    },
    phoneNumber : {
        type: 'Number'
    },
    verified : {
        type : 'Boolean' ,
        default : false
    } ,
    role : {
        type : String,
        enum: ['Admin', 'Client', 'Restaurant','Delivery'],
        default: 'Client'
    },
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

module.exports = mongoose.model('users',User)