const Task = require("../models/Task.model");

module.exports.tasksController = {
  getTasks: async (req, res) => {
    try {
      const getTasks = await Task.find().populate("lesson");
      res.json(getTasks);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  addTask: async (req, res) => {
    try {
      const { title, lesson, descr, keys, answer } = req.body;
      const newTask = await Task.create({
        title,
        lesson,
        descr,
        keys,
        // image: req.file.path,
        answer,
      });
      res.json(newTask);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  getTaskById: async (req, res) => {
    try {
      const getOneTask = Task.findById(req.params.id).populate("lesson");
      res.json(getOneTask);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
