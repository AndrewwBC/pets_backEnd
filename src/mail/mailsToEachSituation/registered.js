const SENDMAIL = require("../transporter");
const HTML_TEMPLATE = require("../htmlTemplate");

const message = "Registrou-se";
const options = {
  from: "pets4ever", // sender address
  to: "andrewborgescampos@gmail.com", // receiver email
  subject: "Registrou", // Subject line
  text: message,
  html: HTML_TEMPLATE(message),
};

SENDMAIL(options, (info) => {
  console.log("Email sent successfully");
  console.log("MESSAGE ID: ", info.messageId);
});
