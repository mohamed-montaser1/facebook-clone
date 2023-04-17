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
    likes: {
      count: {
        type: Number,
        default: 0,
      },
      users: {
        type: [
          {
            username: String,
            user_avatar: String,
          },
        ],
        default: [],
      },
    },
    loves: {
      count: {
        type: Number,
        default: 0,
      },
      users: {
        type: [
          {
            username: String,
            user_avatar: String,
          },
        ],
        default: [],
      },
    },
    care: {
      count: {
        type: Number,
        default: 0,
      },
      users: {
        type: [
          {
            username: String,
            user_avatar: String,
          },
        ],
        default: [],
      },
    },
    haha: {
      count: {
        type: Number,
        default: 0,
      },
      users: {
        type: [
          {
            username: String,
            user_avatar: String,
          },
        ],
        default: [],
      },
    },
    wow: {
      count: {
        type: Number,
        default: 0,
      },
      users: {
        type: [
          {
            username: String,
            user_avatar: String,
          },
        ],
        default: [],
      },
    },
    sad: {
      count: {
        type: Number,
        default: 0,
      },
      users: {
        type: [
          {
            username: String,
            user_avatar: String,
          },
        ],
        default: [],
      },
    },
    angry: {
      count: {
        type: Number,
        default: 0,
      },
      users: {
        type: [
          {
            username: String,
            user_avatar: String,
          },
        ],
        default: [],
      },
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
