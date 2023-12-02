const { tasksController } = require("../controllers/tasks.controller");
const { Router } = require("express");
const imgMiddleware = require("../models/middlewares/img.middleware");
const router = Router();

router.get("/tasks", tasksController.getTasks);
router.get("/tasks/:id", tasksController.getTaskById);
router.post("/tasks", imgMiddleware.single("image"), tasksController.addTask);

module.exports = router;
