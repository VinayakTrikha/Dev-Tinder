const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { isAllowedParameters } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

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
    res.status(200).json({ message: "User data fetched", responseData });
  } catch (error) {
    console.error("Error in /profile/view:", error);
    res.send("Something went wrong");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  const data = req.body;
  try {
    isAllowedParameters(data, req.user);
    const params = req.user?._id;
    await User.findByIdAndUpdate(params, data, {
      runValidators: true,
    });
    res.send("Updated Successfully !!!");
  } catch (error) {
    console.error("Error in /profile/edit:", error);
    res.send("Something went wrong");
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  const { password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const params = req.user?._id;
    await User.findByIdAndUpdate(
      params,
      { password: passwordHash },
      {
        runValidators: true,
      }
    );
    res.send("Updated Successfully");
  } catch (error) {
    console.error("Error in /profile/password:", error);
    res.send("Something went wrong");
  }
});

// profileRouter.get("/feed", async (req, res) => {
//   try {
//     const user = await User.find({});
//     res.send(user);
//   } catch (error) {
//     res.status(400).send("User not found");
//   }
// });

module.exports = profileRouter;
