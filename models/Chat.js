const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    room: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
