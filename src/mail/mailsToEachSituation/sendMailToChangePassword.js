const SENDMAIL = require("../sendMailFunction");
const HTML_TEMPLATE = require("../htmlTemplate");
const sendMailFunction = require("../sendMailFunction");

const sendEmailToChangePasswordFunction = (userEmail, userName) => {
  const message = `Esqueceu sua senha? Sem problemas. Clique neste link para trocar a sua senha 
  <a href=www.google.com>Clique Aqui</a>`;

  const options = {
    from: "pets",
    to: userEmail,
    subject: "MUDAR SENHA",
    text: message,
    html: HTML_TEMPLATE(message),
  };

  sendMailFunction(options);
};

module.exports = sendEmailToChangePasswordFunction;
