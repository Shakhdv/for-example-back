const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
  title: String,
  program: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Program",
  },
});

const lesson = mongoose.model("Lesson", lessonSchema);

module.exports = lesson;
