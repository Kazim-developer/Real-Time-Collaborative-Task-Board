const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  adminName: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    default: [],
  },
  tasks: {
    type: [
      {
        title: { type: String, required: true },
        assignedTo: { type: String },
        subTasks: {
          type: [
            {
              title: { type: String, required: true },
              assignedTo: { type: String },
            },
          ],
          default: [],
        },
      },
    ],
    default: [],
  },
});

const boardModel = new mongoose.model("board", boardSchema);

module.exports = boardModel;
