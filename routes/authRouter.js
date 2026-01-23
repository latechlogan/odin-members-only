const { Router } = require("express");
const router = Router();
const authValidator = require("../validators/authValidator");
const authController = require("../controllers/authController");

router.get("/signup", (req, res) => res.render("signup-form"));
router.post("/signup", authValidator.signupValidation, authController.signup);

router.get("/login", (req, res) => res.send("show login form"));
router.post("/login", (req, res) => res.send("authenticate user"));

router.get("/logout", (req, res) => res.send("log user out"));

module.exports = router;
