const registeredMailValidation = require("../mail/mailsToEachSituation/registered");
const registeredMail = require("../mail/mailsToEachSituation/registered");
const sendEmailToChangePasswordFunction = require("../mail/mailsToEachSituation/sendMailToChangePassword");
const UserRepository = require("../repository/UserRepository");
const generateAccessToken = require("../utils/generateToken");

class UserController {
  index(req, res) {
    res.send("Hello, World");
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Preencha os campos corretamente!" });
    }

    const findByEmail = await UserRepository.findByEmail(email);
    if (!findByEmail) {
      res.status(404).json({ error: "Conta Inexistente!" });
    }

    const getUserId = await UserRepository.login(email, password);
    console.log(getUserId);

    if (getUserId?.id) {
      const accessToken = generateAccessToken(getUserId.id);
      res.status(200).json({ token: accessToken });
    }
  }

  show() {}
  async create(req, res) {
    let { name, email, password } = req.body;
    let error = [];

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    if (name.length < 1) {
      error.push({
        field: "username",
        message: "O usuário deve preencher o nome",
      });
    }

    const usernameAlreadyExists = await UserRepository.findByUsername(name);
    console.log(usernameAlreadyExists);
    if (usernameAlreadyExists)
      error.push({
        field: "username",
        message: "Nome de usuário já utilizado!",
      });

    const emailAlreadyRegistered = await UserRepository.findByEmail(email);
    if (emailAlreadyRegistered)
      error.push({ field: "email", message: "Email já cadastrado!" });

    if (password.length < 6) {
      error.push({
        field: "password",
        message: "A senha deve conter seis ou mais caractéres!",
      });
      res.status(400).json(error);
      return;
    }

    if (error.find((erro) => erro)) {
      res.status(400).json(error);
      return;
    }

    const registerUser = await UserRepository.store(userData);

    if (registerUser) {
      registeredMailValidation(email, name);
      res.status(200).json({ message: name, email, password });
    }
  }
  update() {}
  delete() {}

  async sendEmailToChangePassword(req, res) {
    const { email } = req.body;

    sendEmailToChangePasswordFunction(email);

    return res.status(200).json({ message: "Email enviado" });
  }
}

module.exports = new UserController();
