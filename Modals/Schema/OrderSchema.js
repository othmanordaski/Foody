const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    items: [{
        menuId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    total: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'outForDelivery', 'delivered', 'cancelled'],
        default: 'pending'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Assuming you have a User model for customers
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant', // Assuming you have a Restaurant model
        required: true
    },
    /*
    deliveryPersonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'delivery' // Assuming you have a DeliveryPerson model
    },*/
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', Order);
