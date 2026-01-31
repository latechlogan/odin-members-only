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

router.get("/login", authController.loginGet);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

router.post("/logout", authController.logout);

module.exports = router;
