const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
  title: String,
  program: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Program",
  },
  descr: String,
  number: Number,
  text: String,
  image: String,
  video: String,
  head1: String,
  image1: String,
  text1: String,
  head2: String,
  image2: String,
  text2: String,
  head3: String,
  image3: String,
  text3: String,
  tasks: [
    {
      complete: {
        type: Boolean,
        default: false,
      },
      task: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Task",
      },
    },
  ],
});

const lesson = mongoose.model("Lesson", lessonSchema);

module.exports = lesson;
