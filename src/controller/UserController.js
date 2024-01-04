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
      res.status(404).json({ error: "Email inexistente!" });
    }

    console.log("Resposta do findByEmail:" + findByEmail);
    const login = await UserRepository.login(email, password);
    console.log(login);
    if (login?.email) {
      res.status(200).json({ message: "Login efetuado com sucesso!" });
    }
  }

  show() {}
  create(req, res) {
    const { name, email, password } = req.body;

    res.status(200).json({ message: name, email, password });
  }
  update() {}
  delete() {}
}

module.exports = new UserController();
