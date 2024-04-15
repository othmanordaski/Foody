const express = require('express')
const router = express.Router()

const {RegisterDelivery,
    LoginDelivery
    } = require('../Controllers/deliveryperson')

const {DeliveryProfile,
     UpdateProfile,
   deleteProfile
    } = require('../Controllers/deliveryprofile')

const {Sanitize} = require('../Middlwares/sanitize')
const {Validate} = require('../Middlwares/validate')
const {isAuthenticated} = require('../Middlwares/auth.middleware')


//Registration 
router.route('/register')
.post(Sanitize,Validate,RegisterDelivery)

//Login
router.route('/login')
.post(LoginDelivery)

//profile
router.route('/profile')
.get(isAuthenticated,DeliveryProfile)
router.route('/profile/edit')
.patch(isAuthenticated,UpdateProfile)
router.route('/profile/delete')
.delete(deleteProfile)

module.exports = router