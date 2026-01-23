const { validationResult, matchedData } = require("express-validator");

const signup = (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }

  const data = matchedData(req);
  console.log(`Signup: ${data.email}`);
  res.redirect("/");
};

module.exports = { signup };
