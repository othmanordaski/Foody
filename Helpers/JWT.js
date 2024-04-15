const jwt = require('jsonwebtoken');

exports.generateToken = async (data)=>{

    return jwt.sign(data, process.env.SECRETKEY, {expiresIn: '1h'})

}

exports.verifyToken = (token)=>{
    return jwt.verify(token, process.env.SECRETKEY)
}