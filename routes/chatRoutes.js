const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

router.route("/:room").get(protect, getMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;
