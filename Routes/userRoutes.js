const express = require('express')
const {renderRegister,
    registerUser,
    renderLogin,
    userLogin} 
    = require('../Controllers/UserControllers')
const {Sanitize} = require('../Middlwares/sanitize')
const {Validate} = require('../Middlwares/validate')
const routes = express.Router()

//Registration 
routes.route('/register')
.get(renderRegister)
.post(Sanitize,Validate,registerUser)

//Login
routes.route('/login')
.get(renderLogin)
.post(userLogin)

module.exports = routes