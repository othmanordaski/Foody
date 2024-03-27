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
  