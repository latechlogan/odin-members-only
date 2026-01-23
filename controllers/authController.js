const { validationResult, matchedData } = require("express-validator");

const signupGet = (req, res) => {
  res.render("signup-form");
};

const signupPost = (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }

  const data = matchedData(req);
  console.log(`Signup: ${data.email}`);
  res.redirect("/");
};

module.exports = { signupGet, signupPost };
