const jwt = require("jsonwebtoken");
const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Token must to be provided" });

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decodedToken);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" }); //
  }

  next();
}

module.exports = authenticateToken;
