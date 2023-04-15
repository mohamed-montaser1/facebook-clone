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
    posts: {
      type: [
        {
          author_avatar: String,
          author_name: String,
          content: String,
          likes: Number,
          loves: Number,
          haha: Number,
          wow: Number,
          sad: Number,
          angry: Number,
          comments_content: {
            type: [
              {
                user_avatar: String,
                username: String,
                comment: String,
                isAuthor: Boolean,
              },
            ],
          },
          comments_count: Number,
          post_image: {
            type: String,
            default: "",
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true, version_key: false }
);

module.exports = mongoose.model("User", UserSchema);
