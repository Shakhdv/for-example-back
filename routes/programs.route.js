const { programsController } = require("../controllers/programs.controller");
const { Router } = require("express");
const imgMiddleware = require("../models/middlewares/img.middleware");
const router = Router();

router.get("/programs", programsController.getPrograms);
router.get("/programs/:id", programsController.getProgramById);
router.post(
  "/programs",
  imgMiddleware.single("image"),
  programsController.addProgram
);
router.patch("/programs", programsController.addLessons);


module.exports = router;
