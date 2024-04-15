const bcrypt = require('bcrypt')

class Hashing{
    async hashPassword(password,salt=10){
        return await bcrypt.hash(password,salt);
    }
    async comparePassword(password,hashedPassword){
        return await bcrypt.compare(password,hashedPassword);
    }
}

module.exports = new Hashing