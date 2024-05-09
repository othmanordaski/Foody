const User = require('../Modals/Schema/UserSch')
const Token = require('../Modals/Schema/token')
const restaurantSchema = require('../Modals/Schema/RestaurantSch')
const DeliveryPerson = require('../Modals/Schema/Delivery')
const AdminSchema = require('../Modals/Schema/AdminSchema')
const {sendEmailVerification} = require('../Helpers/mailverify')
const {HTTP_STATUS_CODES,RESPONSE_MESSAGES} = require('../config/constants')
const {hashPassword,comparePassword} = require('../Helpers/Hashing')
const {generateToken} = require('../Helpers/JWT')
const {sendPaawordResetMail} = require('../Helpers/mailer')
const crypto = require('crypto')

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
        const token = await new Token({
            userId : admin._id,
            token : crypto.randomBytes(32).toString("hex")
        }).save()
        const sendTokenMail = await sendEmailVerification(admin.email,token.userId,token.token) //function to verify email client
        if(sendTokenMail){
            await sendEmail(admin.email,admin.username)
        }
        res.status(HTTP_STATUS_CODES.OK).send(RESPONSE_MESSAGES.ADMIN_CREATED_SUCCESS)
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({message : RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR});
    }
}

//To Verify Email Address
exports.verifyEmail = async (req,res) => {
    try{
        const verToken = req.params.token
        const userToken = await Token.findOne({
            userId : req.params.id,
            token : verToken
        })

        if(!userToken){
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({message: RESPONSE_MESSAGES.VERIFICATION_LINK_EXPIRED})
        }else{
            const user = await AdminSchema.findOne({_id : req.params.id})
            if(!user){
                return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).send({message: RESPONSE_MESSAGES.UNAUTHORIZED})
            }else if(user.verified){
                return res.status(HTTP_STATUS_CODES.OK).send({message: RESPONSE_MESSAGES.ALREADY_VERIFIED})
            }else{
                const updated = await user.updateOne({verified:true})

                if(!updated){
                    return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({message: RESPONSE_MESSAGES.FAILURE})
                }else{
                    const deleteToken = await Token.deleteOne({token : verToken})
                    return res.status(HTTP_STATUS_CODES.OK).send({message :RESPONSE_MESSAGES.VERIFIED_SUCCESS})
                }
            }
        }
    }catch(error){
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message : RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR})
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

exports.forgotPassword = async (req,res) => {
    try{
        const {email} = req.body
        const user = await User.findOne({email})

        if(!user){
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({message : RESPONSE_MESSAGES.USER_NOT_FOUND})
        }

        const resetToken = crypto.randomBytes(20).toString('hex')

        //save the token to the user schema in database
        user.resetPasswordToken = resetToken
        user.resetPasswordExpires = Date.now() + 3600000

        await user.save()

        await sendPaawordResetMail(email,resetToken)

        return res.status(HTTP_STATUS_CODES.OK).json({message: 'Password resetemail sent'})
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).JSON({message : RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR})
    }
}

exports.resetPassword = async (req,res) => {
    try{
        const {token} = req.params
        const {newPassword} = req.body

        const user = await User.findOne({resetPasswordToken:token, resetPasswordExpires:{$gt: Date.now()}})

        if(!user){
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({message : RESPONSE_MESSAGES.USER_TOKEN_INVALID})
        }
        const hashingPassword = await hashPassword(newPassword)
        user.password = hashingPassword
        user.resetPasswordToken = undefined 
        user.resetPasswordExpires = undefined

        await user.save()

        return res.status(HTTP_STATUS_CODES.OK).json({message : RESPONSE_MESSAGES.USER_PASSWORD_RESET_SUCCESS})
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).JSON({message : RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR})
    }
}