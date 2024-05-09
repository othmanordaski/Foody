const DeliveryPerson = require('../Modals/Schema/Delivery')
const Token = require('../Modals/Schema/token')
const {HTTP_STATUS_CODES,RESPONSE_MESSAGES} = require('../config/constants')
const {sendEmail}= require ('../Helpers/mailer')
const {sendEmailVerification} = require('../Helpers/mailverify')
const {hashPassword,comparePassword}=require('../Helpers/Hashing')
const {generateToken}= require('../Helpers/JWT')
const crypto = require('crypto')

exports.RegisterDelivery = async (req,res)=>{
    
    try{
        const {email}=req.body;
        const deliverperson = await DeliveryPerson.findOne({email});
        if(deliverperson){
            return res.status(400).json({message:RESPONSE_MESSAGES.DELIVER_ALREADY_EXIST})
        }
        const{username,password,phoneNumber,address,vehicleType,vehiclePlateNumber,status}= req.body
        const hashedPassword = await hashPassword(password)
        const newUser = new DeliveryPerson({
            username,
            email : email,
            password : hashedPassword,
            address ,
            vehicleType,
            phoneNumber ,
            vehiclePlateNumber,
            status
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
        res.status(200).send({message : RESPONSE_MESSAGES.DELIVERY_REGISTER_SUCCESS})
    }catch(error){
        res.status(500).send({message : RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR});
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
            const user = await DeliveryPerson.findOne({_id : req.params.id})
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

exports.LoginDelivery = async (req,res) => {
        try{
            const {email,password} = req.body
            const user = await DeliveryPerson.findOne({email:email})
            if(!user){
                return res.status(400).json({message : RESPONSE_MESSAGES.DELIVERY_INVALID_CREDENTIALS})
            }
    
            const checked =await comparePassword(password,user.password)
            if(!checked) return res.status(400).json({message:RESPONSE_MESSAGES.DELIVERY_PASSWORD_WRONG})
            const token = await generateToken(user)
            res.status(200).cookie('tokenAuth',token).send({message : RESPONSE_MESSAGES.DELIVERY_LOGGED_IN})
        }catch(error){
            res.status(500).send({message : RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR});
        }
    }
