const express = require('express')
const router = express.Router()

const {RegisterDelivery,
    LoginDelivery
    } = require('../Controllers/deliveryperson')

const {DeliveryProfile,
     UpdateProfile,
   deleteProfile
    } = require('../Controllers/deliveryprofile')

const {assignDelivery} = require('../Controllers/Orders.Controllers')

const {Sanitize} = require('../Middlwares/sanitize')
const {Validate} = require('../Middlwares/validate')
const {isAuthenticated} = require('../Middlwares/auth.middleware')
const {checkPermission} = require('../Middlwares/rbacMiddleware')


//Registration 
router.route('/register')
.post(RegisterDelivery)

//Login
router.route('/login')
.post(LoginDelivery)

//profile
router.route('/profile')
.get(isAuthenticated,checkPermission("viewDeliveryDetails"),DeliveryProfile)
router.route('/profile/edit')
.patch(isAuthenticated,checkPermission("updateProfile"),UpdateProfile)
router.route('/profile/delete')
.delete(checkPermission("updateProfile"),deleteProfile)

router.route('/orders/assignOrder/:id')
.get(isAuthenticated,checkPermission("AssignedOrder"),assignDelivery)

module.exports = router