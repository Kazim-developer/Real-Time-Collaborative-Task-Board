const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const isAuthenticated = require("../middleware/auth");

router.post("/user-login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  const isMatched = await bcrypt.compare(password, user.password);

  if (!user) {
    return res
      .status(401)
      .json({ message: "Invalid Credentials, no such user exists" });
  }
  if (!isMatched) {
    return res.status(401).json({ message: "Wrong Password, try again" });
  }
  if (email !== user.email) {
    return res.status(401).json({ message: "Wrong email, try again" });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token, { httpOnly: true, sameSite: "lax" });

  res.status(200).json({
    message: "Login Successful",
    user: {
      id: user._id,
      email: user.email,
    },
  });
});

router.get("/user-login", isAuthenticated, (req, res) => {
  res.status(200).json({ authenticated: true, user: req.user });
});

module.exports = router;
