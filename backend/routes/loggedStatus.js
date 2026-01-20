const isAuthenticated = require("../middleware/auth");
const router = require("./userLogin");

router.get("/me", isAuthenticated, (req, res) => {
  res.status(200).json({ authenticated: true, user: req.user });
});

module.exports = router;
