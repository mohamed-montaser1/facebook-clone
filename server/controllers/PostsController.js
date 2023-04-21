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
        allPosts: allPosts.reverse(),
    });
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */

exports.getOne = async (req, res) => {
    const {id} = req.params;
    const post = await Post.findById(id);

    res.json(post);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */

exports.create = async (req, res) => {
    const {author_name, author_avatar, author_id, content, image} =
        req.body.data;

    const user = await User.findById(author_id);

    let reactions = {
        likes: [],
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

    user.posts = [post, ...user.posts];

    try {
        await post.save().then(() => console.log("post saved successfully"));
        await user.save().then(() => console.log("user saved successfully"));
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
    const {id} = req.params;
    try {
        await Post.deleteOne({_id: id});
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
    const {id} = req.params;
    let {username, user_avatar, user_comment} = req.body.data;
    let post = await Post.findById(id);
    if (post.comments_content.length > 0) {
        post.comments_content.push({username, user_avatar, user_comment});
        post.comments_count++;
    } else {
        post.comments_content = [{username, user_avatar, user_comment}];
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
    const {postId, userId} = req.params;
    try {
        var post = await Post.findById(postId);
        var user = await User.findById(userId);

        var isCurrentUserLike;

        if (post.likes.includes(userId)) {
            isCurrentUserLike = true;
        } else {
            isCurrentUserLike = false;
        }

        res.json({
            reactions: {
                likes: post.likes,
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
            isCurrentUserLike,
        });
    } catch (error) {
        return res.json({
            success: false,
            error_message: error.message,
            error_data: error,
        });
    }
};

exports.AddLikeHandler = async (req, res) => {
    const {postId, userId} = req.params;

    let post = await Post.findById(postId);
    let user = await User.findById(userId);

    // TODO: Add User Id To Post.likes[]

    post.likes = [...post.likes, user._id];
    try {
        let message = "Liked Successfully!"
        await post.save().then(() => console.log(message))
        res.status(201).json({
            success: true,
            message,
            likes: post.likes,
        })
    } catch (e) {
        res.json({
            success: false,
            error_data: e,
            message: e.message,
        })
    }

};

exports.RemoveUserLike = async (req, res) => {
  const {postId, userId} = req.params;

  let post = await Post.findById(postId);
  let user = await User.findById(userId);

  //  TODO: Search For User In Post.likes[] And Remove It Then send response

 if (post.likes.includes(user._id)) {
   post.likes.splice(post.likes.indexOf(user._id), 1);
   let message = "removed like successfully!";
  try {
    await post.save().then(() => console.log(message))
    res.status(200).json({
      success: true,
      message,
      likes: post.likes
    })
  } catch (error) {
    console.log(error)
    res.json({
      error
    })
  }
 }


}