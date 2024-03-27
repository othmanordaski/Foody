const express = require('express')

const {renderRegister,
    registerUser,
    renderLogin,
    userLogin
    } = require('../Controllers/Clients.Controllers')

const {profileUser,
    UpdateProfile,
    deleteProfile
    } = require('../Controllers/Profile.Controllers')

const {Sanitize} = require('../Middlwares/sanitize')
const {Validate} = require('../Middlwares/validate')
const {isAuthenticated} = require('../Middlwares/auth.middleware')
const routes = express.Router()

//Registration 
routes.route('/register')
.get(renderRegister)
.post(Sanitize,Validate,registerUser)

//Login
routes.route('/login')
.get(renderLogin)
.post(userLogin)

//Profile
routes.route('/profile')
.get(isAuthenticated,profileUser)
//Update
routes.route('/profile/edit')
.patch(isAuthenticated,UpdateProfile)
//Delete
routes.route('/profile/delete')
.delete(isAuthenticated,deleteProfile)

module.exports = routes