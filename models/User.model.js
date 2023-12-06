const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  admin: {
    type: Boolean,
    default: false,
  },
  name: String,
  age: Number,
  login: String,
  password: String,
  avatar: String,
  programs: [
    {
      complete: {
        type: Boolean,
        default: false,
      },
      test: {
        type: Boolean,
        default: false,
      },
      program: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Program",
      },
      lessonsComplete: [String],
    },
  ],
  cash: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
