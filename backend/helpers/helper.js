const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

exports.HashPassword = async (pass) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);
    return hash;
  } catch (error) {
    throw error;
  }
};

exports.VerifyPassword = async (pass, hash) => {
  try {
    console.log(pass, hash,"test")
    const compare = await bcrypt.compare(pass, hash);
    return compare;
  } catch (error) {
    throw error;
  }
};

// Create a transporter using the SMTP configuration
exports.mailSender = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Change to your email service provider
    auth: {
      user: "ybajaj2402@gmail.com", // Your email address
      pass: "momqshnylxeswfcc", // Your email password or an application-specific password
    },
  });
  // Define the email message
  const mailOptions = {
    from: "ybajaj2402@gmail.com", // Sender's email address
    to: email, // Recipient's email address
    subject: "Test Email", // Email subject
    text: otp, // Email plain text body
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    } else {
      // console.log("Sending the Mail");
      return info;
    }
  });
};

exports.AddMinutesToDate = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
  }
