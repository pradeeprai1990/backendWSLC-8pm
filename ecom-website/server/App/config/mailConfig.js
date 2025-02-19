const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "pradeep.9997@gmail.com",
      pass: "dgwgmmuhajxgbbqe",
    },
  });
  
  module.exports={transporter}