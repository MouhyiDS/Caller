const express = require("express");
const router = express.Router();
const { sendMessage, fetchMessages } = require("../controllers/messageController");
const { authMiddleware } = require("../middlware/authMiddleware");

router.post("/", authMiddleware, sendMessage);
router.get("/", authMiddleware, fetchMessages);

module.exports = router;
