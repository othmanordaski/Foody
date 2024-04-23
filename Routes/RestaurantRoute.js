const express = require('express')
const router = express.Router()

const uploadImage = require('../Middlwares/multer')
const {getAllMenus, getSingleMenu, createMenu, updateMenu, deleteMenu}=require('../Controllers/MenuController')

const {registerRestaurant,restaurantLogin,getRestaurantProfile,updateRestaurantProfile,deleteRestaurantProfile} = require('../Controllers/RestauControllers')
const {isAuthenticated} = require('../Middlwares/auth.middleware')

router.route('/register')
.post(registerRestaurant)

router.route('/login')
.post(restaurantLogin)

router.route('/profile')
.get(isAuthenticated,getRestaurantProfile)

router.route('/profile/edit/:id')
.patch(updateRestaurantProfile)

router.route('/profile/delete/:id')
.delete(deleteRestaurantProfile)

router.route('/menu')
.get(getAllMenus)
.post(isAuthenticated,uploadImage,createMenu)
router.route('/menu/:id')
.get(getSingleMenu)
.patch(isAuthenticated,uploadImage,updateMenu)
.delete(isAuthenticated,deleteMenu)

module.exports = router