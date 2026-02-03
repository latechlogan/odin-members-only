const { Router } = require("express");
const router = Router();
const messagesController = require("../controllers/messagesController");
const { ensureAuthenticated, ensureAdmin } = require("../middleware/auth");

// protected routes (must be logged in)
router.get("/new", ensureAuthenticated, messagesController.showMessageForm);
router.post("/", ensureAuthenticated, messagesController.createNewMessage);

// admin ONLY route
router.post("/:id/delete", ensureAdmin, messagesController.deleteMessage);

module.exports = router;
