const { body } = require("express-validator");

const signupValidation = [
  body("first_name").notEmpty().withMessage("First name is required").trim(),
  body("last_name").notEmpty().withMessage("Last name is required").trim(),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword(),
  body("password_confirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

module.exports = { signupValidation };
