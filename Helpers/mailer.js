const nodemailer = require('nodemailer')
require('dotenv').config()

exports.sendEmail = async (mail,username) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

    const mailOptions = {
        from: process.env.EMAIL,
        to: mail,
        subject: "Welcome To our platform",
        html : `<h3>Welcome ${username}</h3><br><p>Thank you for registering</p>`
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
          res.send('Error');
        } else {
          console.log("Email sent: " + info.response);
          res.send("Success");
        }
      });

}

exports.sendPaawordResetMail = async (email,resetToken) => {
  try{
    const transporter = nodemailer.createTransport({
      service : 'gmail' ,
      auth : {
        user : process.env.EMAIL,
        pass : process.env.PASSWORD
      }
    })

    const mailOptions = {
      from : process.env.EMAIL,
      to : email,
      subject : 'Password Reset',
      html : `<p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
      <p>Please click on the following link, or paste this into your browser to complete the process:</p>
      <p><a href="${process.env.CLIENT_URL}/reset-password/${resetToken}">Reset Password Link</a></p>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Password reset email sent : ', result.response)
  }catch(error){
    console.error('Error sending password reset email : ', error)
  }
}