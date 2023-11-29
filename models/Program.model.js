const mongoose = require("mongoose");

const programSchema = mongoose.Schema({
  programName: String,
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },
  lessons: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Lesson",
    },
  ],
  descr: String,
  image: String,
  price: Number,
  reviews: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Review",
    },
  ],
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
