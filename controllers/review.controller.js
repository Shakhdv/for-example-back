const Review = require("../models/Review.model");

module.exports.reviewController = {
  getReviews: async (req, res) => {
    const reviews = await Review.find().populate("userId");

    res.json(reviews);
  },
  addReview: async (req, res) => {
    const { text, userId, programId } = req.body;
    try {
      const newReview = await Review.create({
        text,
        userId,
        programId,
      });
      const review = await Review.findById(newReview._id).populate("userId");
      return res.json(review);
    } catch (e) {
      return res.status(401).json(e.toString());
    }
  },
  deleteReview: async (req, res) => {
    try {
      const data = await Review.findByIdAndDelete(req.params.id);

      return res.json(data);
    } catch (error) {
      return res.status(401).json(e.toString());
    }
  },
};
