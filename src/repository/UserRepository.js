const ExecuteQuery = require("../database");

const db = ExecuteQuery;

class UserRepository {
  async findAll() {
    const { rows } = await db("SELECT * FROM users");
    return rows;
  }

  async findById() {}

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

  async login(email, password) {
    const [row] = await db(
      `select users.email from users WHERE users.email = $1 AND users.password = $2 `,
      [email, password]
    );

    console.log(row);
    return row;
  }

  async store(userData) {
    const { name, email, password } = userData;

    const [row] = await db(
      "INSERT INTO users(name, email, password) values($1,$2,$3) RETURNING *",
      [name, email, password]
    );

    return row;
  }

  update() {}

  delete() {}
}

module.exports = new UserRepository();
