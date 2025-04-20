const nodemailer = require("nodemailer");
const { extractDate } = require("./helper");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // Use SSL for Zoho Mail
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // logger: true, // Logs debug information
  // debug: true, // Enables detailed error messages
});

// Function to send OTP email
const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Your OTP for Employee Registration",
    text: `Your OTP is: ${otp}. It expires in 3 minutes. Make sure to register within this duration`,
  });
};

const sendRegistrationMsg = async (email) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Registration successful with SI Infratech",
    text: "You have successfully registered your account with us. Use this app to register your attendance daily",
  });
};

const sendEmailToMe = async (email) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,         
    to: process.env.SMTP_USER,           
    replyTo: email,
    subject: "Customer contacting",
    text: `${email} has contacted you.`,
  });
};

const sendLeaveMsg = async (email, startDate, endDate, action) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Leave Status",
    text: `Your leave between ${extractDate(startDate)} to ${extractDate(
      endDate
    )} has been ${action}`,
  });
};

module.exports = { sendOTP, sendRegistrationMsg, sendLeaveMsg, sendEmailToMe };
