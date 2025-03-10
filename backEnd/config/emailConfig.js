const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:"spsv442004@gmail.com",
    pass:"lbysvrlqeqithgtm",
  },
});

module.exports = transporter;
