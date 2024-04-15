const nodemailer = require('nodemailer')
require('dotenv').config()

exports.sendEmailVerification = async (mail,userId,token) => {
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
        subject: "Verify your email address",
        text : `Please click the confirmation link.
        http://localhost:3000/client/verify/:${userId}/:${token}`
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
  