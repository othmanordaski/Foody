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
        const {username,email,password,age,clientAddress,country,sex,phoneNumber,bio,verified} = req.body
        const user = await User.findOne({email :email})
        if(user){
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({message: 'User already exists'})
        }
        const hashedPassword = await hashPassword(password)
        const newUser = new User({
            username,
            email : email,
            password : hashedPassword,
            age ,
            clientAddress,
            country ,
            sex ,
            phoneNumber ,
            bio,
            verified
        })
        const result = await newUser.save()
        const token = await new Token({
            userId : newUser._id,
            token : crypto.randomBytes(32).toString("hex")
        }).save()
        const sendTokenMail = await sendEmailVerification(newUser.email,token.userId,token.token) //function to verify email client
        if(sendTokenMail){
            sendEmail(newUser.email,newUser.username)
        }
        res.status(HTTP_STATUS_CODES.OK).send(RESPONSE_MESSAGES.USER_CREATED_SUCCESS)
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server Error');
    }
}

//To Verify Email Address
exports.verifyEmail = async (req,res) => {
    try{
        const token = req.params.token
        const userToken = await Token.findOne({
            userId : req.params.id,
            token : token
        })

        if(!userToken){
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({message: "Your verification link may have expired."})
        }else{
            const user = await User.findOne({_id : req.params.id})
            if(!user){
                return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).send({message: "We were enable to find a user for this verification.Signup!"})
            }else if(user.verified){
                return res.status(HTTP_STATUS_CODES.OK).send({message: "User has been already verified.Please login"})
            }else{
                const updated = await User.updateOne({verified:true})

                if(!updated){
                    return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({message: "error"})
                }else{
                    return res.status(HTTP_STATUS_CODES.OK).send({message : "Your account has been successfuly verified"})
                }
            }
        }
    }catch(error){
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("An error occurred")
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
        if(!checked) return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({message:"Incorrect Password"})

        const token = await generateToken(user)
        res.status(HTTP_STATUS_CODES.OK).cookie('tokenAuth',token).send('User logged successfuly')
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server Error');
    }
    
}

//Logout
exports.userLogout = async (req,res) => {
    try{
        res.clearCookie('tokenAuth')
        res.send("Logout successfuly")
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server Error')
    }
}