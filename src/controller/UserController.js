const UserRepository = require("../repository/UserRepository");

class UserController {
  index(req, res) {
    res.send("Hello, World");
  }

  async login(req, res) {
    const { email, password } = req.body;
    console.log("Seu email:" + email, password);

    if (!email || !password) {
      res.status(400).json({ error: "Preencha os campos corretamente!" });
    }

    const findByEmail = await UserRepository.findByEmail(email);
    if (!findByEmail) {
      res.status(404).json({ error: "Conta Inexistente!" });
    }

    console.log("Resposta do findByEmail:" + findByEmail);
    const login = await UserRepository.login(email, password);
    console.log(login);
    if (login?.email) {
      res.status(200).json({ message: "Login efetuado com sucesso!" });
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
        field: "name",
        message: "O usuário deve preencher o nome",
      });
    }

    const emailAlreadyRegistered = await UserRepository.findByEmail(email);
    console.log(emailAlreadyRegistered);
    if (emailAlreadyRegistered) {
      error.push({ field: "email", message: "Email já cadastrado!" });
    }

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
    console.log(registerUser);

    if (registerUser) res.status(200).json({ message: name, email, password });
  }
  update() {}
  delete() {}
}

module.exports = new UserController();
