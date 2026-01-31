const { Router } = require("express");
const router = Router();
const authValidator = require("../validators/authValidator");
const authController = require("../controllers/authController");
const passport = require("passport");

router.get("/signup", authController.signupGet);
router.post(
  "/signup",
  authValidator.signupValidation,
  authController.signupPost,
);

router.get("/login", (req, res) => res.send("show login form"));
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
