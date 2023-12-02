const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  title: String,
  lesson: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Lesson",
  },
  descr: String,
  keys: [String],
  answer: String,
  image: {
    type: String,
    default: null,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
