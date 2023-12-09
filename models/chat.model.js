const mongoose = require("mongoose");

const messagesSchema = mongoose.Schema({

  messages1: []
});
const messages = mongoose.model("messages", messagesSchema);

module.exports = messages;
