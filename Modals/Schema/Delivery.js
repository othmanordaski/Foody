const mongoose = require('mongoose')
   
const DeliveryPerson = mongoose.Schema({   
// //   // ID: { // Unique identifier for each delivery person (Primary Key)
// //         type: 'string', // Assuming the ID is a string, could be different depending on implementation
// //         unique: true, // Ensures uniqueness
// //         required: true // Mandatory field
//     },
    username: { // Name of the delivery person
        type: 'string', // Assuming the name is a string
        required: true // Mandatory field
    },
    phoneNumber: { // Contact number of the delivery person
        type: Number, // Assuming the phone number is a string
        required: true // Mandatory field
    },
    email: { // Email address of the delivery person
        type: 'string', // Assuming the email is a string
        required: true, // Mandatory field
        unique: true // Ensures uniqueness
    },
    password : {
        type : 'string',
        required : true,
    },
    address: { // Current address of the delivery person
        type: 'string', // Assuming the address is a string
        required: true // Mandatory field
    },
    vehicleType: { // Type of vehicle used for delivery
        type: 'string', // Assuming the vehicle type is a string
        enum: ['car', 'moto'],
        required: true // Mandatory field
    },
    vehiclePlateNumber: { // License plate number of the vehicle
        type: 'string', // Assuming the plate number is a string
        required: true // Mandatory field
    },
    status: { // Current availability status
        type: 'string', // Assuming the status is a string
        enum: ['available', 'busy', 'offline'], // Possible values for status
        //required: true // Mandatory field
    },
    rating: { // Average rating given by customers for delivery service
        type: 'number', // Assuming the rating is a number
        min: 0, // Minimum possible rating
       // max: 5 // Maximum possible rating
    },
    joinedDate: { // Date when the delivery person joined the platform
        type: 'date', // Assuming the joined date is a date type
        //required: true // Mandatory field
    }
})

module.exports = mongoose.model('delivery',DeliveryPerson)
