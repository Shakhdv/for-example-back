const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  title: String,
  lesson: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Lesson",
  },
  keys: [String],
  answer: String
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
