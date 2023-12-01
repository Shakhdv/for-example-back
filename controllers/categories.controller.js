const Category = require("../models/category.model");

module.exports.categoryController = {
  getCategory: async (req, res) => {
    const categories = await Category.find();

    res.json(categories);
  },
  addCategory: async (req, res) => {
    const { name } = req.body;
    const newCategory = await Category.create({
      name: name,
    });
    res.json(newCategory);
  },
};
