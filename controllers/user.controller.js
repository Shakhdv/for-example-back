const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userController = {
  getOneUser: async (req, res) => {
    try {
      const users = await User.findById(req.user.id).populate({
        path: "programs.program",
        populate: { path: "lessons.lesson", populate: { path: "tasks.task" } },
      });
      res.json(users);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate("programs.program");
      res.json(users);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  addUsers: async (req, res) => {
    const { login, password, admin, email } = req.body;
    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));

    const user = await User.create({
      login: login,
      password: hash,
      avatar: req.file.path,
      admin,
      email,
    });

    res.json(user);
  },
  addCash: async (req, res) => {
    const { newCash } = req.body;
    const { id } = req.params;

    const userOne = await User.findById(id);
    const oldCash = userOne.cash;
    if (Number(newCash) > 0) {
      const sum = Number(newCash) + oldCash;

      const user = await User.findByIdAndUpdate(id, {
        cash: sum,
      });
      user.save();
  
      return res.json(user);
    }
    res.json(userOne);
  },
  login: async (req, res) => {
    const { login, password } = req.body;
    const candidate = await User.findOne({ login: login });
    if (!candidate) {
      return res.status(401).json({ error: "неверный логин" });
    }

    const valid = await bcrypt.compare(password, candidate.password);
    if (!valid) {
      return res.status(401).json({ error: "неверный пароль" });
    }
    const payload = {
      id: candidate._id,
    };
    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "24h",
    });
    res.json({ token, id: payload.id });
  },
  addPrograms: async (req, res) => {
    const { program, id, price } = req.body;
    const userOne = await User.findById(id);
    const oldCash = userOne.cash;
    const sum = oldCash - price;

    const user = await User.findById(id);

    if (
      !user.programs.find(
        (item) => item.program.toString() === program.toString()
      )
    ) {
      console.log("ok");

      await user.updateOne({
        $addToSet: {
          programs: {
            program,
          },
        },
        cash: sum,
      });

      await user.save();

      return res.json("added");
    }

    return res.json({ error: "something went wrong" });
  },
  completeProgram: async (req, res) => {
    try {
      const { id } = req.params;
      const { programId } = req.body;
      const user = await User.findById(id);

      const myPrograms = await user.programs.map((item) => {
        if (item._id.toString() === programId) {
          item.complete = true;
        }
        return item;
      });

      await user.updateOne({ programs: myPrograms });
      await user.save();

      const updatedUser = await User.findById(id);
      return await res.json(updatedUser);
    } catch (error) {
      return res.status(401).json({ error: "Ошибка: " + error.message });
    }
  },
  completeLesson: async (req, res) => {
    try {
      const { id } = req.params;
      const { programId, lessonId } = req.body;
      const user = await User.findById(id).populate({
        path: "programs.program",
        populate: { path: "lessons.lesson" },
      });
      const program = await user.programs.map((item) => {
        if (item.program._id.toString() === programId) {
          item.program.lessons.map((lesson) => {
            if (lesson.lesson._id.toString() === lessonId) {
              item.lessonsComplete = [...item.lessonsComplete, lessonId];
            }
            return lesson;
          });
        }
        return item;
      });
      console.log(program);
      const myPrograms = await user.programs.map((item) => {
        if (item._id === program._id) {
          item = program;
        }
        return item;
      });
      await user.updateOne({ programs: myPrograms });
      await user.save();
      const updatedUser = await User.findById(id);

      return res.json(updatedUser);
    } catch (error) {
      return res.status(401).json({ error: "Ошибка: " + error.message });
    }
  },
  ProgramToTest: async (req, res) => {
    try {
      const { id } = req.params;
      const { myProgramId } = req.body;
      const user = await User.findById(id);

      const myPrograms = await user.programs.map((item) => {
        if (item._id.toString() === myProgramId) {
          item.test = true;
        }
        return item;
      });

      await user.updateOne({ programs: myPrograms });
      await user.save();

      const updatedUser = await User.findById(id);
      return await res.json(updatedUser);
    } catch (error) {
      return res.status(401).json({ error: "Ошибка: " + error.message });
    }
  },
  addConsults: async (req, res) => {
    const { id, message } = req.body;
    const user = await User.findByIdAndUpdate(id, {
      $push: {
        consultMessage: {
          message,
        },
      },
    });
    res.json(user);
  },
};
