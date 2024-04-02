const express = require('express')

const {
    registerUser,
    userLogin,
    userLogout
    } = require('../Controllers/Clients.Controllers')

const {profileUser,
    UpdateProfile,
    deleteProfile
    } = require('../Controllers/Profile.Controllers')

const {
    allOrders,
    orderDetails,
    updateOrder,
    deleteOrder,
    trackOrder
} = require('../Controllers/Orders.Controllers')

const {Sanitize} = require('../Middlwares/sanitize')
const {Validate} = require('../Middlwares/validate')
const {isAuthenticated} = require('../Middlwares/auth.middleware')
const routes = express.Router()

//Registration 
routes.route('/register')
.post(Sanitize,Validate,registerUser)

//Login
routes.route('/login')
.post(userLogin)

//Logout
routes.route('/logout')
.post(userLogout)

//Profile
routes.route('/profile')
.get(isAuthenticated,profileUser)
//Update
routes.route('/profile/edit')
.patch(Sanitize,Validate,isAuthenticated,UpdateProfile)
//Delete
routes.route('/profile/delete')
.delete(isAuthenticated,deleteProfile)

//All Orders 
routes.get('/orders',allOrders)
//Order details, update and delete
routes.route('/orders/:id')
.get(orderDetails)
.patch(updateOrder)
.delete(deleteOrder)
//Tracking Order
routes.get('/orders/track',trackOrder)

module.exports = routes