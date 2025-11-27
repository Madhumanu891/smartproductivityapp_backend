const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    agenda: { type: String },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    startTime: { type: Date },
    endTime: { type: Date },
    meetingLink: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meeting", meetingSchema);
