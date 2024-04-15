const User = require('../Modals/Schema/UserSch')
const {HTTP_STATUS_CODES,RESPONSE_MESSAGES} = require('../config/constants')
const {hashPassword,comparePassword} = require('../Helpers/Hashing')

exports.profileUser = async (req,res) => {
    try{
        const id = req.user.user._id
        const user = await User.findById(id)
        if(!user) return res.status(HTTP_STATUS_CODES.NOT_FOUND).json(RESPONSE_MESSAGES.USER_NOT_FOUND)

        const fields = {
            username : user.username,
            email : user.email,
            age : user.age,
            country : user.country,
            sex : user.sex,
            phoneNumber : user.phoneNumber,
            bio : user.bio
        }
        res.status(HTTP_STATUS_CODES.OK).json(fields)

    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
}


exports.UpdateProfile = async (req, res) => {
    try {
        const id = req.user.user._id;
        const { username, email, password, age, country, sex, phoneNumber, bio } = req.body;

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
            country,
            sex,
            phoneNumber,
            bio
        };

        if (hashedPassword) {
            updateFields.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });

        res.json({
            message: 'Profile updated successfully',
        });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
}

exports.deleteProfile = async (req,res) => {
    try {
        const id= req.user.user._id
        const user = await User.deleteOne({_id : id})
        res.json({
            message: 'Profile deleted successfully',
        });
    }catch (err) {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR);
    }
}