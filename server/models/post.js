const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    author_name: {
      type: String,
      required: true,
    },
    author_avatar: String,
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
    loves: {
      type: Number,
      required: true,
      default: 0,
    },
    haha: {
      type: Number,
      required: true,
      default: 0,
    },
    wow: {
      type: Number,
      required: true,
      default: 0,
    },
    sad: {
      type: Number,
      required: true,
      default: 0,
    },
    angry: {
      type: Number,
      required: true,
      default: 0,
    },
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
