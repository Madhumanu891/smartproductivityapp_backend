const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      enum: ["Active", "Completed", "On Hold"],
      default: "Active",
    },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
