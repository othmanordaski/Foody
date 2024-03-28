const User = require('../Modals/Schema/Delivery')
const {hashPassword,comparePassword} = require('../Helpers/Hashing')

exports.DeliveryProfile = async (req,res) => {
    try{
        const id = req.params.id
        const user =await User.findById({_id:id})
    if (!user){
        req.status(400).res('user not found')
    }
    res.status(200).json(user)

    }catch(error){
        console.log('error' , error)
        res.status(500).send('Server Error');
    }
}

exports.UpdateProfile = async(req,res) => {
    try{
    // const id = req.params.id
    console.log(req.user);
    const {_id}=req.user
    const iduser = _id
    console.log(iduser)
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
        status,rating,
        joinedDate})
    res.status(200).json(newprofile)
}catch(error){
    console.log('error' , error)
    res.status(500).send('Server Error');
}
}

exports.deleteProfile = async (req,res) => {
    try {
        
        const id= req.params.id
        // console.log(id)
        const user = await User.deleteOne({_id :id})
        res.status(200).send( 'user successfully deleted ')
        ;
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
