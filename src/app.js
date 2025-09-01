const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
var cors = require('cors');
require('dotenv').config()
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  credentials: true
};
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => console.log("Server started"));
    console.log("Cluster connected to the applications");
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });
