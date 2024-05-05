const express = require('express')
//const passport = require('passport')
const {checkPermission} = require('../Middlwares/rbacMiddleware')
const {
    registerUser,
    verifyEmail,
    userLogin,
    userLogout
    } = require('../Controllers/Clients.Controllers')

const {profileUser,
    UpdateProfile,
    deleteProfile,
    forgotPassword,
    resetPassword
    } = require('../Controllers/Profile.Controllers')

const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getDeliveryDetails
} = require('../Controllers/Orders.Controllers')

const {Sanitize} = require('../Middlwares/sanitize')
const {RegisterValidate,LoginValidate} = require('../Middlwares/Validate/ClientValidate')
const validate = require('../Middlwares/validateHandleError')
const {isAuthenticated} = require('../Middlwares/auth.middleware')
const routes = express.Router()

// Cette route ne sera accessible qu'aux utilisateurs authentifiés via Google OAuth 2.0
/*
routes.get('/profile', passport.authenticate('google', { session: false }), (req, res) => {
    res.send('Bienvenue dans votre profil');
})
*/
// Route de callback pour l'authentification Google OAuth 2.0
/*
routes.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Rediriger l'utilisateur vers la page de profil après une authentification réussie
    res.redirect('/profile');
})*/

//Registration 
routes.route('/register')
.post(Sanitize,RegisterValidate,registerUser)

//Verify email
routes.route('/verify/:id/:token')
.get(verifyEmail)
//Login
routes.route('/login')
.post(LoginValidate,validate,userLogin)

//Logout
routes.route('/logout')
.post(userLogout)

//Profile
routes.route('/profile')
.get(isAuthenticated,profileUser)
//Update
routes.route('/profile/edit')
.patch(Sanitize,RegisterValidate,validate,isAuthenticated,checkPermission("updateProfile"),UpdateProfile)
//Delete
routes.route('/profile/delete')
.delete(isAuthenticated,deleteProfile)

//route for forget password
routes.route('/forgot-password')
.post(isAuthenticated,forgotPassword)
//route to reset password
routes.route('/reset-password/:token')
.post(isAuthenticated,resetPassword)

//Create order
routes.post('/create-order/:id/:menuid',isAuthenticated,checkPermission('createOrder'),createOrder)
//All Orders 
routes.get('/orders',isAuthenticated,checkPermission('viewOrders'),getAllOrders)
//Order details, update and delete
routes.route('/orders/:id')
.get(isAuthenticated,checkPermission('viewOrders'),getOrderById)
.patch(isAuthenticated,checkPermission('updateOrder'),updateOrder)
.delete(isAuthenticated,checkPermission('deleteOrder'),deleteOrder)

//Tracking Order
//routes.get('/orders/track',isAuthenticated, checkPermission('trackOrder'),trackOrder)

module.exports = routes