const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function sendVerificationEmail(userEmail, userId) {

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "hdverifyemailtest@gmail.com",
      pass: process.env.MAIL_APP_PASSWORD,
    },
  });

  let mailOptions = {
    from: "hdverifyemailtest@gmail.com",
    to: userEmail,
    subject: 'Email Verification',
    html: `
      <h2>Please click on the link below to verify your email</h2>
      <p>${process.env.HOST_URL}/api/register/verify_email/${token}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
module.exports = { sendVerificationEmail };
// sendVerificationEmail("swanmhtetlynn@gmail.com", 1);