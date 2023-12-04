const Program = require("../models/Program.model");

module.exports.programsController = {
  getPrograms: async (req, res) => {
    try {
      const getPrograms = await Program.find().populate([{path: 'lessons.lesson', populate: {path: 'tasks.task'}}, 'category']);
      console.log(getPrograms[0].lessons[0].lesson.tasks);
      res.json(getPrograms);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  addProgram: async (req, res) => {
    try {
      const { programName, category, descr, price, demo } = req.body;
      const newProgram = await Program.create({
        programName,
        descr,
        price,
        image: req.file.path,
        demo,
        category,
      });
      res.json(newProgram);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  getProgramById: async (req, res) => {
    try {
      const getOneProgram = Program.findById(req.params.id).populate(
        "category"
      );
      res.json(getOneProgram);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  addLessons: async (req, res) => {
    const { lesson, id } = req.body;

    const program = await Program.findByIdAndUpdate(id, {
      $push: {
        lessons: {
          lesson
        },
      },
    });

    res.json(program);
  },
};
