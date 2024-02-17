const express = require("express");
const UserController = require("./controller/UserController");
const cors = require("./middlewares/cors");
const errorHandler = require("./middlewares/errorHandler");
const authenticateToken = require("./middlewares/validateToken");

const app = express();

app.use(express.json());
app.use(cors);

app.get(
  "/userDataAfterLogin",
  authenticateToken,
  UserController.getDataAferLogin
);

app.post("/login", UserController.login);
app.post("/register", UserController.create);
app.post(
  "/forgotpassword",
  authenticateToken,
  UserController.sendEmailToChangePassword
);

app.use(errorHandler);

app.listen("3001", () => console.log("Server On 3001!"));
