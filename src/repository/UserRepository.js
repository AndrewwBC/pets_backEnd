const ExecuteQuery = require("../database");
const bcrypt = require("bcrypt");

const db = ExecuteQuery;

class UserRepository {
  async findAll() {
    const { rows } = await db("SELECT * FROM users");
    return rows;
  }

  async findById() {}

  async getUsername(userId) {
    const [row] = await db(`SELECT users.name FROM USERS where users.id = $1`, [
      userId,
    ]);

    return row;
  }

  async findByUsername(username) {
    const [row] = await db(
      `SELECT users.name FROM USERS WHERE users.name = $1`,
      [username]
    );

    return row;
  }

  async findByEmail(loginEmail) {
    const [row] = await db(
      `select users.email from users where users.email = $1`,
      [loginEmail]
    );

    if (row?.email) {
      return row?.email;
    }

    return false;
  }

  async getDataToLoginAuth(email, password) {
    const [row] = await db(
      `select users.id, users.password from users WHERE users.email = $1`,
      [email]
    );

    console.log(row);
    return row;
  }

  async store(userData) {
    const { name, email, password } = userData;

    const cryptedPassword = await bcrypt.hash(password, 12);

    const [row] = await db(
      "INSERT INTO users(name, email, password) values($1,$2,$3) RETURNING *",
      [name, email, cryptedPassword]
    );

    return row;
  }

  update() {}

  delete() {}
}

module.exports = new UserRepository();
