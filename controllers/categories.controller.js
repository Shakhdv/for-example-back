const Category = require("../models/Category.model");

module.exports.categoriesController = {
  getCategories: async (req, res) => {
    try {
      const getCategories = await Category.find();
      res.json(getCategories);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  addCategory: async (req, res) => {
    try {
      const { categoryName, } = req.body;
      const newCategory = await Category.create({
        categoryName,
      });
      res.json(newCategory);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const getOneCategory = Category.findById(req.params.id);
      res.json(getOneCategory);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
