const User = require('../Modals/Schema/UserSch')
const {sendEmail} = require('../Helpers/mailer')
const {hashPassword,comparePassword} = require('../Helpers/Hashing')
const {generateToken} = require('../Helpers/JWT')

exports.renderRegister = (req,res) => {
    res.send('/register')
}

exports.renderLogin = (req,res) => {
    res.send('/login')
}

exports.registerUser = async (req,res) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: 'User already exists'})
        }
        const {username,password,age,country,sex,phoneNumber,bio} = new User(req.body)
        const hashedPassword = await hashPassword(password)
        const newUser = new User({
            username,
            email : email,
            password : hashedPassword,
            age ,
            country ,
            sex ,
            phoneNumber ,
            bio
        })
        const result = await newUser.save()
        sendEmail(newUser.email,newUser.username)
        res.status(200).send('User registration successful')
    }catch(error){
        console.log('error' , error)
        res.status(500).send('Server Error');
    }
}

exports.userLogin = async (req,res) => {
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message : 'Invalid Credentials'})
        }

        const checked =await comparePassword(password,user.password)
        if(!checked) return res.status(400).json({message:"Incorrect Password"})

        const token = await generateToken({user : user})
        res.status(200).cookie('tokenAuth',token).send('User logged successfuly')
    }catch(error){
        console.log('error' , error)
    }
}