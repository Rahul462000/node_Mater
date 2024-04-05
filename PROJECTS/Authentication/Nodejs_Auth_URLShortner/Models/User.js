const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "NORMAL",
  },
  password: {
    type: String,
    required: true,
  },
});

const USER = mongoose.model("USER", UserSchema);

module.exports = USER;
