const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  text: String,
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  programId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Program",
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
