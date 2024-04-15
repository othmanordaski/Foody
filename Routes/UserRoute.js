const express = require('express')
const passport = require('passport')

const {
    registerUser,
    verifyEmail,
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

// Cette route ne sera accessible qu'aux utilisateurs authentifiés via Google OAuth 2.0
routes.get('/profile', passport.authenticate('google', { session: false }), (req, res) => {
    res.send('Bienvenue dans votre profil');
})

// Route de callback pour l'authentification Google OAuth 2.0
routes.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Rediriger l'utilisateur vers la page de profil après une authentification réussie
    res.redirect('/profile');
})

//Registration 
routes.route('/register')
.post(Sanitize,Validate,registerUser)

//Verify email
routes.route('/verify/:id/:token')
.get(verifyEmail)
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