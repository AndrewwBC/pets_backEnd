const express = require("express");
const UserController = require("./controller/UserController");

const app = express();
const cors = require("./middlewares/cors");
const errorHandler = require("./middlewares/errorHandler");
const { connectDB } = require("./database");

app.use(express.json());
app.use(cors);
app.use(connectDB());

app.get("/", (req, res) => {
  res.send("Oi").sendStatus(200);
});

app.post("/login", UserController.login);
app.post("/register", UserController.create);
app.post("/forgotpassword", UserController.sendEmailToChangePassword);
app.use(errorHandler);

app.listen("3001", () => console.log("Server On 3001!"));
