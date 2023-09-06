const nodemailer = require("nodemailer");
const path = require("path");

// initialize nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "levanchinh2422003@gmail.com",
    pass: "osed ceou sddr bpzr",
  },
});

const mailOptions = {
  from: "levanchinh2422003@gmail.com", // sender address
  to: "chinhlvde170423@fpt.edu.vn", // list of receivers
  subject: "Welcome!",
  template: "email", // the name of the template file i.e email.handlebars
  text: "Co nguoi dat, check db",
};

// trigger the sending of the E-mail
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    return console.log(error);
  }
  console.log("Message sent: " + info.response);
});
module.exports = {
  transporter,
  mailOptions,
};
