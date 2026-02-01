const db = require("../db/queries");

const index = async (req, res) => {
  const messages = await db.listMessages();
  res.render("index", { messages: messages });
};

const showMessageForm = (req, res) => {
  res.send("show new message form");
};

const createNewMessage = async (req, res) => {
  res.send("create new message");
};

const deleteMessage = async (req, res) => {
  res.send("delete message");
};

module.exports = { index, showMessageForm, createNewMessage, deleteMessage };
