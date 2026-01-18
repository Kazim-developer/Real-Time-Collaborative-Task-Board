const isAuthenticated = require("../middleware/auth");
const router = require("./userLogin");

router.get("/auth/status", isAuthenticated, (req, res) => {
  res.status(200).json({
    authenticated: true,
    user: req.user,
  });
});
