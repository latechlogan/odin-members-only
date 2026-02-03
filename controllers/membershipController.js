const db = require("../db/queries");
const crypto = require("node:crypto");

const joinGet = (req, res) => {
  res.render("join");
};

const joinPost = async (req, res) => {
  const userAttempt = req.body.joinPassword;
  const secretPassword = process.env.MEMBERSHIP_SECRET;

  const isCorrect = crypto.timingSafeEqual(
    Buffer.from(userAttempt),
    Buffer.from(secretPassword),
  );

  if (isCorrect) {
    await db.makeMember(req.user.id);
    return res.redirect("/");
  } else {
    return res.redirect("/join");
  }
};

module.exports = { joinGet, joinPost };
