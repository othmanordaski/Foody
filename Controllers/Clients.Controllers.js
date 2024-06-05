const User = require('../Modals/Schema/UserSch')
const Token = require('../Modals/Schema/token')
const {HTTP_STATUS_CODES,RESPONSE_MESSAGES} = require('../config/constants')
const {sendEmail} = require('../Helpers/mailer')
const {sendEmailVerification} = require('../Helpers/mailverify')
const {hashPassword,comparePassword} = require('../Helpers/Hashing')
const {generateToken} = require('../Helpers/JWT')
const crypto = require('crypto')

//Register
exports.registerUser = async (req,res) => {
    try{
        const {username,email,password,age,clientAddress,phoneNumber,verified} = req.body
        const user = await User.findOne({email :email})
        if(user){
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({message: RESPONSE_MESSAGES.USER_ALREADY_EXIST})
        }
        const hashedPassword = await hashPassword(password)
        const newUser = new User({
            username,
            email : email,
            password : hashedPassword,
            age ,
            clientAddress,
            phoneNumber ,
            verified
        })
        const result = await newUser.save()
        const token = await new Token({
            userId : newUser._id,
            token : crypto.randomBytes(32).toString("hex")
        }).save()
        const sendTokenMail = await sendEmailVerification(newUser.email,token.userId,token.token) //function to verify email client
        if(sendTokenMail){
            await sendEmail(newUser.email,newUser.username)
        }
        res.status(HTTP_STATUS_CODES.OK).send(RESPONSE_MESSAGES.USER_CREATED_SUCCESS)
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({Error : RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR});
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
            const user = await User.findOne({_id : req.params.id})
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
exports.userLogin = async (req,res) => {
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
        }

        const checked =await comparePassword(password,user.password)
        if(!checked) return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({message: RESPONSE_MESSAGES.USER_WRONG_PASSWORD})

        const token = await generateToken(user)
        res.status(HTTP_STATUS_CODES.OK).cookie('tokenAuth',token).send({message : RESPONSE_MESSAGES.USER_LOGGED_IN, tokenAuth : token, user})
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({message : RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR});
    }
    
}

//Logout
exports.userLogout = async (req,res) => {
    try{
        res.clearCookie('tokenAuth')
        res.send({message : RESPONSE_MESSAGES.USER_LOGGED_OUT})
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({message : RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR})
    }
}