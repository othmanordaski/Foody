const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email :{
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  verified : {
    type : 'Boolean' ,
    default : false
  } ,
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
      type: Date
  },
  role: {
    type: String,
    required: true,
    enum: ['Admin', 'Client', 'Restaurant','Delivery'],
    default : 'Admin' // Adjust based on your roles
  }
});

module.exports = mongoose.model('Admin', AdminSchema);
