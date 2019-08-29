const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    title: { type: String, default: "Untitled" },
    content: String,
    completed: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Task", TaskSchema);
