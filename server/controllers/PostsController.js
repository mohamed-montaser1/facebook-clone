let Post = require("../models/post");

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

exports.create = async (req, res) => {
  const { author_name, author_avatar, content } = req.body.data;

  let likes_count = 0;

  let comments_content = [];
  let comments_count = 0;

  let post = new Post({
    author_avatar,
    author_name,
    content,
    likes_count,
    comments_content,
    comments_count,
  });

  try {
    await post.save();
    res.status(201).json({
      success: true,
      message: "Created Successfuly",
    });
  } catch (error) {
    res.json(error);
    console.log(error);
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
    console.log(error);
    res.json({
      error,
    });
  }
};
