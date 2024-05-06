const mongoose = require('mongoose')
   
const DeliveryPerson = mongoose.Schema({   
    username: { 
        type: 'string', 
        required: true 
    },
    phoneNumber: {
        type: Number, 
        required: true 
    },
    email: { 
        type: 'string', 
        required: true, 
        unique: true 
    },
    password : {
        type : 'string',
        required : true,
    },
    address: {
        type: 'string', 
        required: true 
    },
    vehicleType: { 
        type: 'string', 
        enum: ['car', 'moto'],
    },
    vehiclePlateNumber: { 
        type: 'string',
    },
    status: {
        type: 'string', 
        enum: ['available', 'busy', 'offline'], 
        //required: true
    },
    rating: { 
        type: 'number', 
        min: 0, 
        max: 5 
    },
    role : {
        type : String,
        enum: ['Admin', 'Client', 'Restaurant','Delivery'],
        default : 'Delivery'
    },
    assignedOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders', 
        required: true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    joinedDate: { 
        type: 'date', 
        //required: true 
    }
})

module.exports = mongoose.model('delivery',DeliveryPerson)
