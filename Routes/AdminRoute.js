const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../Middlwares/auth.middleware')
const { checkPermission } = require('../Middlwares/rbacMiddleware');
const {
    registerAdmin,
    verifyEmail,
    loginAdmin,
    logoutAdmin,
    manageUsers,
    manageRestaurants,
    manageDelivery,
    forgotPassword,
    resetPassword
} = require('../Controllers/AdminControllers');

const {Sanitize} = require('../Middlwares/sanitize')
const {RegisterValidate,LoginValidate} = require('../Middlwares/Validate/AdminValidate')

//Registration 
router.route('/register')
.post(Sanitize,RegisterValidate,registerAdmin)

//Verify email
router.route('/verify/:id/:token')
.get(verifyEmail)

//Login
router.route('/login')
.post(LoginValidate,loginAdmin)

//route for forget password
router.route('/forgot-password')
.post(isAuthenticated,forgotPassword)

//route to reset password
router.route('/reset-password/:token')
.post(isAuthenticated,resetPassword)

//Logout
router.route('/logout')
.post(logoutAdmin)

//Routes to manage all users
router.get('/manage-users', isAuthenticated,checkPermission('manageUsers'),manageUsers);
router.get('/manage-restaurants', isAuthenticated,checkPermission('manageRestaurants'), manageRestaurants);
router.get('/manage-deliveries', isAuthenticated,checkPermission('manageDeliveries'), manageDelivery);

module.exports = router;
