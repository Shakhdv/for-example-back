const { reviewController } = require("../controllers/review.controller");
const { Router } = require("express");
const router = Router();

router.get("/review", reviewController.getReviews);
router.post("/review", reviewController.addReview);
router.delete("/review/:id", reviewController.deleteReview);

module.exports = router;
