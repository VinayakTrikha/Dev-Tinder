const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    // Check if token is missing, empty, or "null"
    if (!token || token === "null" || token === "") {
      return res.status(401).json({ message: "Not logged in" });
    }

    // Verify JWT
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token", error: error.message });
  }
};

module.exports = { userAuth };
