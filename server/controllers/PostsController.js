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
  const { author_name, author_avatar, author_id, content, image } =
    req.body.data;
  const user = await User.findById(author_id);

  let reactions = {
    likes: {
      count: 0,
      users: [],
    },
    loves: {
      count: 0,
      users: [],
    },
    haha: {
      count: 0,
      users: [],
    },
    wow: {
      count: 0,
      users: [],
    },
    sad: {
      count: 0,
      users: [],
    },
    angry: {
      count: 0,
      users: [],
    },
    care: {
      count: 0,
      users: [],
    },
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
    image,
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
  if (post.comments_content.length > 0) {
    post.comments_content.push({ username, user_avatar, user_comment });
    post.comments_count++;
  } else {
    post.comments_content = [{ username, user_avatar, user_comment }];
    post.comments_count = 1;
  }

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
/**
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.handleOpenPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  res.json({
    reactions: {
      likes: post.likes,
      loves: post.loves,
      care: post.care,
      haha: post.haha,
      wow: post.wow,
      sad: post.sad,
      angry: post.angry,
    },
    _id: post._id,
    author_avatar: post.author_avatar,
    author_name: post.author_name,
    comments_content: post.comments_content,
    comments_count: post.comments_count,
    content: post.content,
    createdAt: post.createdAt,
    date: post.date,
    image: post.image,
    updatedAt: post.updatedAt,
  });
};

exports.addReactHandler = async (req, res) => {
  const { reactType, postId } = req.params;

  let post = await Post.findById(postId);
  switch (reactType) {
    case "likes":
      handleLike();
      break;
    case "loves":
      break;
    case "care":
      break;
    case "haha":
      break;
    case "wow":
      break;
    case "sad":
      break;
    case "angry":
      break;
  }

  function handleLike() {
    // if (post.likes.users)
  }
};
