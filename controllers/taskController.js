const Task = require("../models/Task");

// Create New Task
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, deadline, projectId } =
      req.body;

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      status: status || "todo",
      priority: priority || "medium",
      deadline,
      projectId,
    });

    res.status(201).json({ msg: "Task created successfully", task });
  } catch (err) {
    console.error("Create Task Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get All Tasks (User-specific)
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    console.error("Get Tasks Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get Single Task
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) return res.status(404).json({ msg: "Task not found" });

    res.json(task);
  } catch (err) {
    console.error("Get Single Task Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const updates = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updates,
      { new: true }
    );

    if (!task) return res.status(404).json({ msg: "Task not found" });

    res.json({ msg: "Task updated successfully", task });
  } catch (err) {
    console.error("Update Task Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) return res.status(404).json({ msg: "Task not found" });

    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete Task Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
