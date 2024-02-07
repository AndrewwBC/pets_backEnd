const jwt = require("jsonwebtoken");
const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

function generateAccessToken(userId) {
  return jwt.sign({ userId: userId }, process.env.TOKEN_SECRET, {
    expiresIn: "7d",
  });
}

module.exports = generateAccessToken;
