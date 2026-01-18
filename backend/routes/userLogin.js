const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

router.post("/api/user-login", async (req, res) => {
  const formData = req.body;
  const token = jwt.sign(formData, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true });
  const data = await userModel.create(formData);
  res.json(data);
});

module.exports = router;
