const isAuthenticated = require("../middleware/auth");
const router = require("./userLogin");

router.get("/logged-status", isAuthenticated, (req, res) => {
  res.status(200).json({
    authenticated: true,
    user: req.user,
  });
});

module.exports = router;
