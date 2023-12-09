const Messages = require("../models/chat.model");

module.exports.messagesController = {
    getMessage: async (req, res) => {
    try {
      const mess = await Messages.find().populate();
      res.json(mess);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  addMessage: async (req, res) => {
    try {
      const { text } = req.body;
      const mess = await Messages.create({
        text,
      });
      res.json(mess);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};