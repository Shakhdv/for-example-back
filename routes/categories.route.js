const {
  categoriesController,
} = require("../controllers/categories.controller");
const { Router } = require("express");
const router = Router();

router.get("/category", categoriesController.getCategories);
router.get("/category/:id", categoriesController.getCategoryById);
router.post("/category", categoriesController.addCategory);

module.exports = router;
