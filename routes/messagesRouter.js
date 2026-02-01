const { Router } = require("express");
const router = Router();
const messagesController = require("../controllers/messagesController");

// protected routes (must be logged in)
router.get("/new", messagesController.showMessageForm);
router.post("/", messagesController.createNewMessage);

// admin ONLY route
router.delete("/:id", messagesController.deleteMessage);

module.exports = router;
