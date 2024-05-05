const express = require('express')
const router = express.Router()

const uploadImage = require('../Middlwares/multer')
const {getAllMenus, getSingleMenu, createMenu, updateMenu, deleteMenu}=require('../Controllers/MenuController')

const {registerRestaurant,restaurantLogin,getRestaurantProfile,updateRestaurantProfile,deleteRestaurantProfile} = require('../Controllers/RestauControllers')
const {isAuthenticated} = require('../Middlwares/auth.middleware')
const {checkPermission} = require('../Middlwares/rbacMiddleware')

router.route('/register')
.post(registerRestaurant)

router.route('/login')
.post(restaurantLogin)

router.route('/profile')
.get(isAuthenticated,checkPermission("manageRestaurantInfo"),getRestaurantProfile)

router.route('/profile/edit/:id')
.patch(checkPermission("manageRestaurantInfo"),updateRestaurantProfile)

router.route('/profile/delete/:id')
.delete(checkPermission("manageRestaurantInfo"),deleteRestaurantProfile)

router.route('/menu')
.get(checkPermission("manageRestaurantInfo"),getAllMenus)
.post(isAuthenticated,checkPermission("manageRestaurantInfo"),uploadImage,createMenu)
router.route('/menu/:id')
.get(getSingleMenu)
.patch(isAuthenticated,checkPermission("manageRestaurantInfo"),uploadImage,updateMenu)
.delete(isAuthenticated,checkPermission("manageRestaurantInfo"),deleteMenu)

module.exports = router