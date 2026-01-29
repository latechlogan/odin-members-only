const { validationResult, matchedData } = require("express-validator");
const password = require("../utils/password");

const signupGet = (req, res) => {
  res.render("signup-form");
};

const signupPost = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }

  const data = matchedData(req);
  const hashedPassword = await password.hash(data.password);
  console.log(`Signup: ${data.email}`);
  res.redirect("/");
};

module.exports = { signupGet, signupPost };
