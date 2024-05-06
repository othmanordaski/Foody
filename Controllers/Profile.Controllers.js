const User = require('../Modals/Schema/UserSch')
const {HTTP_STATUS_CODES,RESPONSE_MESSAGES} = require('../config/constants')
const {hashPassword,comparePassword} = require('../Helpers/Hashing')
const {sendPaawordResetMail} = require('../Helpers/mailer')
const crypto = require('crypto');

exports.profileUser = async (req,res) => {
    try{
        const id = req.user._id
        const user = await User.findById(id)
        if(!user) return res.status(HTTP_STATUS_CODES.NOT_FOUND).json(RESPONSE_MESSAGES.USER_NOT_FOUND)

        const fields = {
            username : user.username,
            email : user.email,
            age : user.age,
            clientAddress : user.clientAddress,
            phoneNumber : user.phoneNumber,
        }
        res.status(HTTP_STATUS_CODES.OK).json(fields)

    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
}


exports.UpdateProfile = async (req, res) => {
    try {
        const id = req.user._id;
        const { username, email, password, age, clientAddress, phoneNumber } = req.body;

        const userfound = await User.findById(id);
        if (!userfound) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json(RESPONSE_MESSAGES.USER_NOT_FOUND);
        }

        if (password) {
            const check = await comparePassword(password, userfound.password);
            if (check) {
                return res.json({ message: 'Same password' });
            }
        }

        let hashedPassword;
        if (password) {
            hashedPassword = await hashPassword(password);
        }

        const updateFields = {
            username,
            email,
            age,
            clientAddress,
            phoneNumber,
        };

        if (hashedPassword) {
            updateFields.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });

        res.json({
            message: RESPONSE_MESSAGES.USER_UPDATED_SUCCESS,
        });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
}

exports.deleteProfile = async (req,res) => {
    try {
        const id= req.user._id
        const user = await User.deleteOne({_id : id})
        res.json({
            message: 'Profile deleted successfully',
        });
    }catch (err) {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR);
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