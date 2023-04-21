const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    author_name: {
      type: String,
      required: true,
    },
    author_avatar: String,
    content: String,
    image: {
      type: String,
      default: "",
    },
    likes: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] },
    comments_content: [
      {
        username: String,
        user_avatar: String,
        user_comment: String,
      },
    ],
    comments_count: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
