const express = require('express')
const router = express.Router()

const uploadImage = require('../Middlwares/multer')

const {
    getAllMenus, 
    getSingleMenu, 
    createMenu, 
    updateMenu, 
    deleteMenu
}=require('../Controllers/MenuController')

const {
    registerRestaurant,
    verifyEmail,
    restaurantLogin,
    getRestaurantProfile,
    updateRestaurantProfile,
    deleteRestaurantProfile,
    forgotPassword,
    resetPassword
} = require('../Controllers/RestauControllers')

const {Sanitize} = require('../Middlwares/sanitize')
const {RegisterValidate,LoginValidate} = require('../Middlwares/Validate/RestaurantValidate')
const {isAuthenticated} = require('../Middlwares/auth.middleware')
const {checkPermission} = require('../Middlwares/rbacMiddleware')

//Register route
router.route('/register')
.post(Sanitize,RegisterValidate,registerRestaurant)

//Verify email
router.route('/verify/:id/:token')
.get(verifyEmail)

//Login Route
router.route('/login')
.post(LoginValidate,restaurantLogin)

//Profile
router.route('/profile')
.get(isAuthenticated,checkPermission("manageRestaurantInfo"),getRestaurantProfile)

//Edit profile
router.route('/profile/edit/:id')
.patch(checkPermission("manageRestaurantInfo"),updateRestaurantProfile)

//Delete profile
router.route('/profile/delete/:id')
.delete(checkPermission("manageRestaurantInfo"),deleteRestaurantProfile)

//route for forget password
router.route('/forgot-password')
.post(isAuthenticated,forgotPassword)

//route to reset password
router.route('/reset-password/:token')
.post(isAuthenticated,resetPassword)

//Route for menus
router.route('/menu')
.get(checkPermission("manageRestaurantInfo"),getAllMenus)
.post(isAuthenticated,checkPermission("manageRestaurantInfo"),uploadImage,createMenu)

router.route('/menu/:id')
.get(getSingleMenu)
.patch(isAuthenticated,checkPermission("manageRestaurantInfo"),uploadImage,updateMenu)
.delete(isAuthenticated,checkPermission("manageRestaurantInfo"),deleteMenu)

module.exports = router