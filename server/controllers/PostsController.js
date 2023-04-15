let Post = require("../models/post");
let User = require("../models/user");
/**
 *
 * @param {Request} req
 * @param {Response} res
 */

exports.getAll = async (req, res) => {
  let allPosts = await Post.find();

  res.json({
    allPosts,
  });
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */

exports.getOne = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  res.json(post);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */

exports.create = async (req, res) => {
  const { author_name, author_avatar, author_id, content } = req.body.data;
  const user = await User.findById(author_id);

  let reactions = {
    likes: 0,
    loves: 0,
    haha: 0,
    wow: 0,
    sad: 0,
    angry: 0,
  };

  let comments_content = [];
  let comments_count = 0;

  let post = new Post({
    author_avatar,
    author_name,
    content,
    ...reactions,
    comments_content,
    comments_count,
  });

  user.posts.push(post);
  try {
    await post.save();
    await user.save();
    res.status(201).json({
      success: true,
      message: "Created Successfuly",
    });
  } catch (error) {
    res.json(error);
    console.log("create error: ", error);
  }
};
/**
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "deleted Sucessfuly!",
    });
  } catch (error) {
    console.log("delete error: ", error);
    res.json({
      error,
    });
  }
};
/**
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.addComment = async (req, res) => {
  const { id } = req.params;
  let { username, user_avatar, user_comment } = req.body.data;
  let post = await Post.findById(id);
  // post.comments_content.push({ username, user_avatar, user_comment });
  if (post.comments_content.length > 0) {
    post.comments_content = [
      ...post.comments_content,
      { username, user_avatar, user_comment },
    ];
  } else post.comments_content = [{ username, user_avatar, user_comment }];

  try {
    await post.save();
    res.status(200).json({
      success: true,
      message: "Comment Inserted Successfuly",
    });
  } catch (error) {
    console.log("comment insterting error: ", error);
    res.json(error);
  }
};
