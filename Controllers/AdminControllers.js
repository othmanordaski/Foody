const User = require('../Modals/Schema/UserSch')
const restaurantSchema = require('../Modals/Schema/RestaurantSch')
const DeliveryPerson = require('../Modals/Schema/Delivery')
const AdminSchema = require('../Modals/Schema/AdminSchema')
const {HTTP_STATUS_CODES,RESPONSE_MESSAGES} = require('../config/constants')
const {hashPassword,comparePassword} = require('../Helpers/Hashing')
const {generateToken} = require('../Helpers/JWT')

//Register
exports.registerAdmin = async (req,res) => {
    try{
        const {username,email,password,role} = req.body
        const user = await AdminSchema.findOne({email:email})
        if(user){
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({message: RESPONSE_MESSAGES.ADMIN_ALREADY_EXIST})
        }
        const hashedPassword = await hashPassword(password)
        const admin = new AdminSchema({
            username,
            email : email,
            password : hashedPassword,
            role,
        })
        const result = await admin.save()
        res.status(HTTP_STATUS_CODES.OK).send(RESPONSE_MESSAGES.ADMIN_CREATED_SUCCESS)
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({message : RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR});
    }
}

//Login
exports.loginAdmin = async (req,res) => {
    try{
        const {email,password} = req.body
        const admin = await AdminSchema.findOne({email})
        if(!admin){
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
        }

        const checked =await comparePassword(password,admin.password)
        if(!checked) return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({message:RESPONSE_MESSAGES.ADMIN_PASSWORD_INCORRECT})

        const token = await generateToken(admin)
        res.status(HTTP_STATUS_CODES.OK).cookie('tokenAuth',token).send({message : RESPONSE_MESSAGES.ADMIN_LOGGED_IN})
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({message : RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR});
    }
    
}

//Logout
exports.logoutAdmin = async (req,res) => {
    try{
        res.clearCookie('tokenAuth')
        res.status(HTTP_STATUS_CODES.OK).send(RESPONSE_MESSAGES.ADMIN_LOGOUT_SUCCESS)
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
}

exports.manageUsers = async (req,res) => {
    try{
        const users = await User.find()
        res.status(200).json({message: users})
    }catch(error){
        res.status(500).json({ error: RESPONSE_MESSAGES.ADMIN_MANAGE_USER_FAILED});
    }
}

exports.manageRestaurants = async (req,res) => {
    try{
        const restaurants = await restaurantSchema.find()
        res.status(200).json({message: restaurants})
    }catch(error){
        res.status(500).json({ error: RESPONSE_MESSAGES.ADMIN_MANAGE_RESTAURANT_FAILED });
    }
}

exports.manageDelivery = async (req,res) => {
    try{
        const delivery = await DeliveryPerson.find()
        res.status(200).json({message : delivery})
    }catch(error){
        res.status(500).json({ error: RESPONSE_MESSAGES.ADMIN_MANAGE_DELIVERY_FAILED});
    }
}