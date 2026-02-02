const db = require("../db/queries");

const index = async (req, res) => {
  const messages = await db.listMessages();
  res.render("index", { messages: messages });
};

const showMessageForm = (req, res) => {
  res.render("create-message");
};

const createNewMessage = async (req, res) => {
  const { messageTitle, messageContent } = req.body;
  await db.createNewMessage(messageTitle, messageContent, req.user.id);
  res.redirect("/");
};

const deleteMessage = async (req, res) => {
  res.send("delete message");
};

module.exports = { index, showMessageForm, createNewMessage, deleteMessage };
