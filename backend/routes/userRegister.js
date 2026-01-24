const userModel = require("../model/userModel");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/user-register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(401).json({ message: "Email already registered" });
  }
  const user = await userModel.create({ email, password: hashedPassword });
  res.status(201).json({
    message: "User registered",
    user: { id: user._id, email: user.email },
  });
});

module.exports = router;
