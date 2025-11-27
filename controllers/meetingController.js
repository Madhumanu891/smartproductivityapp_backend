const Meeting = require("../models/Meeting");

// Schedule a meeting
const createMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.create(req.body);
    res.status(201).json(meeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all meetings
const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().populate(
      "participants",
      "name email"
    );
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update meeting
const updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(meeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete meeting
const deleteMeeting = async (req, res) => {
  try {
    await Meeting.findByIdAndDelete(req.params.id);
    res.json({ message: "Meeting deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createMeeting, getMeetings, updateMeeting, deleteMeeting };
