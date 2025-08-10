const express = require("express");
const {authenticate} = require("./middlewares/auth");
const app = express();

app.use("/admin", authenticate, (req, res) => {
  res.send("Welcome to the panel");
});

app.use(
  "/users",
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    next();
    res.status();
    res.send("First Response");
  },
  (req, res, next) => {
    next();
  }
);

app.listen(8000, () => console.log("Server started"));
