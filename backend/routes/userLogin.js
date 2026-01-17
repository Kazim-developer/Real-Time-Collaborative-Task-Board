const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

router.post("/api/user-login", async (req, res) => {
  const formData = req.body;
  const data = await userModel.create(formData);
  res.json(data);
});

module.exports = router;
