const SENDMAIL = require("../sendMailFunction");
const HTML_TEMPLATE = require("../htmlTemplate");
const sendMailFunction = require("../sendMailFunction");

const registeredMailValidation = (userEmail, userName) => {
  const message = `Bem-Vindo, ${userName}! Clique neste link para validar o seu email <a href=www.google.com>Clique Aqui</a>`;

  const options = {
    from: "pets",
    to: userEmail,
    subject: "CONTA REGISTRADA",
    text: message,
    html: HTML_TEMPLATE(message),
  };

  sendMailFunction(options);
};

module.exports = registeredMailValidation;
