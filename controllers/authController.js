const { validationResult, matchedData } = require("express-validator");
const { hash } = require("../utils/password");
const db = require("../db/queries");

const signupGet = (req, res) => {
  res.render("signup");
};

const signupPost = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }

  const data = matchedData(req);
  const hashedPassword = await hash(data.password);

  try {
    await db.createNewUser(data, hashedPassword);
    console.log(`Signup: ${data.email}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loginGet = (req, res) => {
  res.render("login");
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports = { signupGet, signupPost, loginGet, logout };
