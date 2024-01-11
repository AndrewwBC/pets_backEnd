const nodemailer = require("nodemailer");
const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

const sendMailFunction = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail(options);
    if (info.accepted)
      console.log(`Email enviado com sucesso. Aceito por: ${info.accepted}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMailFunction;
