const User = require('../Modals/Schema/Delivery')
const {hashPassword,comparePassword} = require('../Helpers/Hashing')

exports.DeliveryProfile = async (req,res) => {
    try{
        const id = req.user._id
        const user =await User.findById({_id:id})
    if (!user){
        req.status(400).res('user not found')
    }
    const profile = {
        username:user.username,
        adress:user.address,
        vehicleType:user.vehicleType,
        vehiclePlateNumber:user.vehiclePlateNumber,
        }
    res.status(200).json(profile)

    }catch(error){
        res.status(500).send('Server Error');
    }
}

exports.UpdateProfile = async(req,res) => {
    try{
    // const id = req.params.id
    const {_id}=req.user
    const iduser = _id
    const{username,email,password,phoneNumber,address,vehicleType,vehiclePlateNumber,status,rating,joinedDate}=req.body
    const existinguser = await User.findById({_id : iduser})
    const verifypassword = await comparePassword(password , existinguser.password)
    if(verifypassword){
    res.status(404).send('password existing')}
    const hashedPassword = await hashPassword(password)
    const newprofile = await User.updateOne({_id : iduser}, 
        {username,
        email,
        password:hashedPassword,
        phoneNumber,
        address,
        vehicleType,
        vehiclePlateNumber,
        status,
        rating})
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
