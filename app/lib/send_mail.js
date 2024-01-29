const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function sendEmail(userEmail, userId, type) {

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "hdverifyemailtest@gmail.com",
      pass: process.env.MAIL_APP_PASSWORD,
    },
  });
  let mailOptions = null;
  if (type==="verification"){
    mailOptions = {
      from: "hdverifyemailtest@gmail.com",
      to: userEmail,
      subject: 'Email Verification',
      html: `
        <h2>Please click on the link below to verify your email</h2>
        <p>${process.env.NEXT_PUBLIC_HOST_URL}/api/register/verify_email/${token}</p>
      `,
    };
  }
  else if (type==="resetPassword"){
    mailOptions = {
      from: "hdverifyemailtest@gmail.com",
      to: userEmail,
      subject: 'Reset Password',
      html: `
        <h2>Please click on the link below to reset your password</h2>
        <p>${process.env.NEXT_PUBLIC_HOST_URL}/reset_password/${token}</p>
      `,
    };
  }

  mailOptions && await transporter.sendMail(mailOptions);
}
module.exports = { sendEmail };