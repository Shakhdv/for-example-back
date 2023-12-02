const { lessonsController } = require("../controllers/lessons.controller");
const { Router } = require("express");
const imgMiddleware = require("../models/middlewares/img.middleware");
const router = Router();

router.get("/lessons", lessonsController.getLesons);
router.get("/lessons/:id", lessonsController.getLessonById);
router.post(
  "/lessons",
  imgMiddleware.single("image"),
  lessonsController.addLesson
);
router.patch("/lessons", lessonsController.addTasks);


module.exports = router;
