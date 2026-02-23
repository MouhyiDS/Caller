const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { sendMessage, fetchMessages, deleteMessage } = require("../controllers/messageController");

router.post("/", authMiddleware, sendMessage);
router.get("/", authMiddleware, fetchMessages);
router.delete("/:id", authMiddleware, deleteMessage)

module.exports = router;
