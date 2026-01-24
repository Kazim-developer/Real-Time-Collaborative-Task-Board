const isAuthenticated = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/me", isAuthenticated, (req, res) => {
  res.status(200).json({ authenticated: true, user: req.user });
});

module.exports = router;
