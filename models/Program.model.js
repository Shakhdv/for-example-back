const mongoose = require("mongoose");

const programSchema = mongoose.Schema({
  programName: String,
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },
  descr: String,
  image: String,
  price: Number,
  demo: String,
  lessons: [
    {
      complete: {
        type: Boolean,
        default: false,
      },
      lesson: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Lesson",
      },
    },
  ],
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
