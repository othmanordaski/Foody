const DeliveryPerson = require('../Modals/Schema/Delivery')
const {sendEmail}= require ('../Helpers/mailer')
const {hashPassword,comparePassword}=require('../Helpers/Hashing')
const {generateToken}= require('../Helpers/JWT')

exports.RegisterDelivery = async (req,res)=>{
    
    try{
        const {email}=req.body;
        const deliverperson = await DeliveryPerson.findOne({email});
        if(deliverperson){
            return res.status(400).json({message:'email already exists'})
        }
        const{username,password,phoneNumber,address,vehicleType,vehiclePlateNumber,status,rating,joinedDate}= req.body
        const hashedPassword = await hashPassword(password)
        const newUser = new DeliveryPerson({
            username,
            email : email,
            password : hashedPassword,
            address ,
            vehicleType,
            phoneNumber ,
            vehiclePlateNumber,
            status,
            rating,
            joinedDate
        })
        const result = await newUser.save()
        sendEmail(newUser.email,newUser.username)
        res.status(200).send('User registration successful')
    }catch(error){
        res.status(500).send('Server Error');
    }
    }

exports.LoginDelivery = async (req,res) => {
        try{
            const {email,password} = req.body
            const user = await DeliveryPerson.findOne({email:email})
            if(!user){
                return res.status(400).json({message : 'Invalid Credentials'})
            }
    
            const checked =await comparePassword(password,user.password)
            if(!checked) return res.status(400).json({message:"Incorrect Password"})
    
            const token = await generateToken(user)
            res.status(200).cookie('tokenAuth',token).send('User logged successfuly')
        }catch(error){
            res.status(500).send('Server Error');
        }
    }
