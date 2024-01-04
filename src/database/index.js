const { Client } = require("pg");

const db = new Client({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "pets",
  port: 5432,
});

db.connect();

async function teste() {
  const { rows } = await db.query("select * from users");
  console.log(rows);
}
teste();
async function ExecuteQuery(query, values) {
  const { rows } = await db.query(query, values);
  return rows;
}

module.exports = ExecuteQuery;
