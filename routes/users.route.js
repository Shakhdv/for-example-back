const { userController } = require("../controllers/user.controller");
const { Router } = require("express");
const router = Router();
const authMiddleware = require("../models/middlewares/auth.middleware");
const avatarMiddleware = require("../models/middlewares/img.middleware");

router.get("/user", authMiddleware, userController.getOneUser);
router.get("/users", userController.getAllUsers);
router.post("/sign", avatarMiddleware.single("image"), userController.addUsers);
router.post("/login", userController.login);
router.patch("/user", authMiddleware, userController.addPrograms);
router.patch("/users/:id", userController.completeProgram);
router.patch("/user/:id", userController.ProgramToTest);

module.exports = router;
