const jwt = require("jsonwebtoken");
const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token must to be provided" });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid Token" }); //
  }

  next();
}

module.exports = authenticateToken;
