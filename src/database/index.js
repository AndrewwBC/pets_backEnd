const { Client } = require("pg");

const db = new Client({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "pets",
  port: 5432,
});

// const db = new Client({
//   host: "roundhouse.proxy.rlwy.net",
//   user: "postgres",
//   password: "G55gFeFD*bAGdD-1a336*gFgA6BA351F",
//   database: "railway",
//   port: 13839,
// });

db.connect();

async function ExecuteQuery(query, values) {
  const { rows } = await db.query(query, values);
  return rows;
}

module.exports = ExecuteQuery;
