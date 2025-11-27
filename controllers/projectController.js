const Project = require("../models/Project");

// Create New Project
const createProject = async (req, res) => {
  try {
    const { name, description, deadline } = req.body;

    const project = await Project.create({
      user: req.user._id,
      name,
      description,
      deadline,
    });

    res.status(201).json({ msg: "Project created successfully", project });
  } catch (err) {
    console.error("Create Project Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get All Projects of Logged User
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(projects);
  } catch (err) {
    console.error("Get Projects Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update Project
const updateProject = async (req, res) => {
  try {
    const updates = req.body;

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updates,
      { new: true }
    );

    if (!project) return res.status(404).json({ msg: "Project not found" });

    res.json({ msg: "Project updated successfully", project });
  } catch (err) {
    console.error("Update Project Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete Project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) return res.status(404).json({ msg: "Project not found" });

    res.json({ msg: "Project deleted successfully" });
  } catch (err) {
    console.error("Delete Project Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
};
