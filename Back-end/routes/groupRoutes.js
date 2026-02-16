const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlware/authMiddleware");
const { adminMiddleware } = require("../middlware/adminMiddleware");
const {create, deleteGroup, find, addMember, dropMember, addAdmin, dropAdmin } = require("../controllers/groupController")

router.get("/findGroup", authMiddleware, find);
router.post("/createGroup", authMiddleware, create);
router.delete("/deleteGroup", authMiddleware, adminMiddleware, deleteGroup);
router.post("/addMember", authMiddleware, adminMiddleware, addMember);
router.delete("/dropMember", authMiddleware, adminMiddleware, dropMember);
router.post("/addAdmin", authMiddleware, adminMiddleware, addAdmin);
router.delete("/dropAdmin", authMiddleware, adminMiddleware, dropAdmin);

module.exports = router;