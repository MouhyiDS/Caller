const express = require("express");
const router = express.Router();
const { sendMessage, fetchMessages, deleteMessage } = require("../controllers/messageController");
const { authMiddleware } = require("../middlware/authMiddleware");

router.post("/", authMiddleware, sendMessage);
router.get("/", authMiddleware, fetchMessages);
router.delete("/", authMiddleware, deleteMessage)

module.exports = router;
