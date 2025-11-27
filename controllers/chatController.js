const Chat = require("../models/Chat");

// Send chat message
const sendMessage = async (req, res) => {
  try {
    const chat = await Chat.create(req.body);
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get messages by room
const getMessages = async (req, res) => {
  try {
    const messages = await Chat.find({ room: req.params.room }).populate(
      "sender",
      "name email"
    );
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendMessage, getMessages };
