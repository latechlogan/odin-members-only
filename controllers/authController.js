const { validationResult, matchedData } = require("express-validator");
const password = require("../utils/password");
const db = require("../db/queries");

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

  try {
    await db.createNewUser(data, hashedPassword);
    console.log(`Signup: ${data.email}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = { signupGet, signupPost };
