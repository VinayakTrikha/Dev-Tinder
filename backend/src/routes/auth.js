const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");
const saltRounds = 10;
const sendEmail = require("../utils/sendEmail");

authRouter.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      photoUrl,
      about,
      skills,
    } = req.body;

    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      photoUrl,
      about,
      skills,
    });
    const val = await user.save();
    res.status(201).json({ message: "Successfully created!!" });
    sendEmail(user.emailId, 'Welcome!!!', 'Welcome to dev tinder a community dedicated to developers`');
  } catch (error) {
    res.status(400).send("Error in saving the user " + error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const responseData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      gender: user.gender,
      photoUrl: user.photoUrl,
      about: user.about,
      skills: user.skills,
    };

    var token = user.getJwt();
    res.cookie("token", token);
    res.status(200).json({ message: "Logged in Successfully", responseData });
  } catch (error) {
    res.status(500).send("An error occurred during login" + error);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json({ message: "Logged out succesfully" });
});

module.exports = authRouter;
