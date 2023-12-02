const Lesson = require("../models/Lesson.model");

module.exports.lessonsController = {
  getLesons: async (req, res) => {
    try {
      const getLessons = await Lesson.find().populate(["program", "tasks.task"]);
      res.json(getLessons);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  addLesson: async (req, res) => {
    try {
      const {
        title,
        program,
        descr,
        text,
        video,
        number,
        head1,
        text1,
        head2,
        text2,
        head3,
        text3,
      } = req.body;
      const newLesson = await Lesson.create({
        title,
        program,
        descr,
        video,
        image: req.file.path,
        text,
        number,
        head1,
        text1,
        head2,
        text2,
        head3,
        text3,
      });
      res.json(newLesson);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  getLessonById: async (req, res) => {
    try {
      const getOneLesson = Lesson.findById(req.params.id).populate("program");
      res.json(getOneLesson);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  addTasks: async (req, res) => {
    const { task, id } = req.body;

    const lesson = await Lesson.findByIdAndUpdate(id, {
      $push: {
        tasks: {
          task
        },
      },
    });

    res.json(lesson);
  },
};
