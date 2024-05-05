const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../Middlwares/auth.middleware')
const { checkPermission } = require('../Middlwares/rbacMiddleware');
const {registerAdmin,loginAdmin,logoutAdmin,manageUsers,manageRestaurants,manageDelivery} = require('../Controllers/AdminControllers');

//Registration 
router.route('/register')
.post(registerAdmin)

//Login
router.route('/login')
.post(loginAdmin)

//Logout
router.route('/logout')
.post(logoutAdmin)

router.get('/manage-users', isAuthenticated,checkPermission('manageUsers'),manageUsers);
router.get('/manage-restaurants', isAuthenticated,checkPermission('manageRestaurants'), manageRestaurants);
router.get('/manage-deliveries', isAuthenticated,checkPermission('manageDeliveries'), manageDelivery);

module.exports = router;
