const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const groupController = require("../controllers/groupController");

// Create group
router.post("/", authMiddleware, groupController.createGroup);

// Get group info
router.get("/:groupId", authMiddleware, groupController.getGroup);

// Delete group
router.delete("/:groupId", authMiddleware, adminMiddleware, groupController.deleteGroup);

// Manage members
router.post("/:groupId/members", authMiddleware, adminMiddleware, groupController.addMember);
router.delete("/:groupId/members/:userId", authMiddleware, adminMiddleware, groupController.removeMember);

// Manage admins
router.post("/:groupId/admins", authMiddleware, adminMiddleware, groupController.addAdmin);
router.delete("/:groupId/admins/:userId", authMiddleware, adminMiddleware, groupController.removeAdmin);

module.exports = router;