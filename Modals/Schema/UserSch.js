const mongoose = require('mongoose')

const User = mongoose.Schema({
    username : {
        type : 'string' ,
        required : true
    },
    email : {
        type: 'string' ,
        required : true 
    },
    password : {
        type : 'string' ,
        required : true
    },
    age : {
        type: 'Number'
    },
    country : {
        type: 'String'
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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('users',User)