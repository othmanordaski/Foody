const User = require('../Modals/Schema/Delivery')
const {hashPassword,comparePassword} = require('../Helpers/Hashing')
const {HTTP_STATUS_CODES,RESPONSE_MESSAGES} = require('../config/constants')
const {sendPaawordResetMail} = require('../Helpers/mailer')

exports.DeliveryProfile = async (req,res) => {
    try{
        const id = req.user._id
        const user =await User.findById({_id:id})
    if (!user){
        req.status(HTTP_STATUS_CODES.BAD_REQUEST).res({message: RESPONSE_MESSAGES.DELIVERY_NOT_FOUND})
    }
    const profile = {
        username:user.username,
        adress:user.address,
        vehicleType:user.vehicleType,
        vehiclePlateNumber:user.vehiclePlateNumber,
        }
    res.status(200).json(profile)

    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({mesaage : RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR});
    }
}

exports.UpdateProfile = async(req,res) => {
    try{
    // const id = req.params.id
    const {_id}=req.user
    const iduser = _id
    const{username,email,password,phoneNumber,address,vehicleType,vehiclePlateNumber,status}=req.body
    const existinguser = await User.findById({_id : iduser})
    const verifypassword = await comparePassword(password , existinguser.password)
    if(verifypassword){
        res.status(404).send('password existing')
    }
    const hashedPassword = await hashPassword(password)
    const newprofile = await User.updateOne({_id : iduser}, 
        {username,
        email,
        password:hashedPassword,
        phoneNumber,
        address,
        vehicleType,
        vehiclePlateNumber,
        status
    })
    res.status(200).send('profile updated')
}catch(error){
    res.status(500).send('Server Error');
}
}

exports.deleteProfile = async (req,res) => {
    try {
        const id = req.user._id
        const user = await User.deleteOne({_id:id})
        res.status(200).send( 'user successfully deleted ')
        ;
    }catch (err) {
        res.status(500).json({ message: 'Server error' });
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