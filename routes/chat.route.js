const { messagesController } = require("../controllers/chat.controller");
const { Router } = require("express");
const router = Router();

router.get("/chat", messagesController.getMessage);
router.post("/chat", messagesController.addMessage);

module.exports = router;
