const express = require('express');
const { getRestaurantProfile,
    renderRegister,
    registerRestaurant,
    renderLogin,
    restaurantLogin,
    updateRestaurantProfile, deleteRestaurantProfile } = require('../Controllers/RestaurantControllers');
const { Sanitize } = require('../Middlwares/sanitize');
const { Validate } = require('../Middlwares/validate');
const routes = express.Router();

// Registration
routes.route('/register')
    .get(renderRegister)
    .post(registerRestaurant);

// Login
routes.route('/login')
    .get(renderLogin)
    .post(restaurantLogin);

// Profile
routes.get('/profile/:id', getRestaurantProfile);

// Update Profile
routes.put('/profile/edit/:id', updateRestaurantProfile);

// Delete Profile
routes.delete('/profile/edit/:id', deleteRestaurantProfile);

module.exports = routes;
