const User = require('../Modals/Schema/UserSch')
const {hashPassword,comparePassword} = require('../Helpers/Hashing')

exports.profileUser = async (req,res) => {
    try{
        const id = req.user.user._id
        const user = await User.findById(id)
        if(!user) return res.status(404).json({message : 'User not found'})
        res.status(200).json(user.username)

    }catch(error){
        res.status(500).send('Server Error');
    }
}


exports.UpdateProfile = async (req, res) => {
    try {
        const id = req.user.user._id;
        const { username, email, password, age, country, sex, phoneNumber, bio } = req.body;

        const userfound = await User.findById(id);
        if (!userfound) {
            return res.status(404).json({ message: 'User not found.' });
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
            data: updatedUser.username
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}
/*
exports.UpdateProfile = async (req,res) => {
    try{
        const id = req.user.user._id
        const {username, email, password, age, country, sex, phoneNumber,bio} = req.body;
        const userfound = await User.findById(id)

        if (!userfound) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const check = await comparePassword(password,userfound.password)
        if(check){
            return res.json({message : 'Same password'})
        }else{
            const hashedPassword = await hashPassword(password);
            const user = await User.updateOne({_id : id},
                { 
                        username,
                         email,
                         password : hashedPassword , 
                         age, 
                         country, 
                         sex,
                         phoneNumber,
                         bio
                });
                res.json({
                    data: user
                });
        }
    }catch(error){
        res.status(500).send('Server Error');
    }
}
*/
exports.deleteProfile = async (req,res) => {
    try {
        const id= req.user.user._id
        const user = await User.deleteOne({_id : id})
        res.json({
            message: 'Profile deleted successfully',
            data: user
        });
    }catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}