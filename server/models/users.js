const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    username: {
      type: String,
      required: [true, "Please Enter Username"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: 7,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
