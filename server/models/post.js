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
    likes_count: {
      type: Number,
      required: true,
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
      default: Date.now()
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
