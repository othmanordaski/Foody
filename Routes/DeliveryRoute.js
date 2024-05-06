const express = require('express')
const router = express.Router()

const {
    RegisterDelivery,
    verifyEmail,
    LoginDelivery
    } = require('../Controllers/deliveryperson')

const {
    DeliveryProfile,
    UpdateProfile,
    deleteProfile,
    forgotPassword,
    resetPassword
    } = require('../Controllers/deliveryprofile')

const {assignDelivery} = require('../Controllers/Orders.Controllers')

const {Sanitize} = require('../Middlwares/sanitize')
const {RegisterValidate,LoginValidate} = require('../Middlwares/Validate/DeliveryValidate')
const {isAuthenticated} = require('../Middlwares/auth.middleware')
const {checkPermission} = require('../Middlwares/rbacMiddleware')


//Registration 
router.route('/register')
.post(Sanitize,RegisterValidate,RegisterDelivery)

//Verify email
router.route('/verify/:id/:token')
.get(verifyEmail)

//Login
router.route('/login')
.post(LoginValidate,LoginDelivery)

//profile
router.route('/profile')
.get(isAuthenticated,checkPermission("viewDeliveryDetails"),DeliveryProfile)

//Edit profile
router.route('/profile/edit')
.patch(isAuthenticated,checkPermission("updateProfile"),UpdateProfile)

//Delete profile
router.route('/profile/delete')
.delete(checkPermission("updateProfile"),deleteProfile)

//route for forget password
router.route('/forgot-password')
.post(isAuthenticated,forgotPassword)

//route to reset password
router.route('/reset-password/:token')
.post(isAuthenticated,resetPassword)

//Assign Order to delivery
router.route('/orders/assignOrder/:id')
.get(isAuthenticated,checkPermission("AssignedOrder"),assignDelivery)

module.exports = router