const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      max: 50,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      max: 50,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: String,
      trim: true,
      validate(emailId) {
        if (!validator.isEmail(emailId)) {
          throw new Error("Not a valid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(password) {
        if (!validator.isStrongPassword(password))
          throw new Error("Not a strong password");
      },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    gender: {
      type: String,
      validate(gender) {
        if (!["male", "female", "others"].includes(gender)) {
          throw new Error("Please select the gender");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.istockphoto.com/photo/black-and-white-business-button-gm2088874815-565713358?utm_source=pixabay&utm_medium=affiliate&utm_campaign=sponsored_image&utm_content=srp_topbannerNone_media&utm_term=avatar+logo",
      validate(url) {
        if (!validator.isURL(url)) {
          throw new Error("Not a valid Url");
        }
      },
    },
    about: {
      type: String,
      default: "This is a default value about user!!",
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 5) {
          throw new Error("Skills can be max 5");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJwt = function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });
  return token;
};

userSchema.methods.validatePassword = async function (inputByUser) {
  const isPasswordValid = await bcrypt.compare(inputByUser, this.password);
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
