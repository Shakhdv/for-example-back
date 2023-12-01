const { categoryController } = require("../controllers/categories.controller");
const { Router } = require("express");
const router = Router();

router.get("/category", categoryController.getCategory);
router.post("/category", categoryController.addCategory);

module.exports = router;
