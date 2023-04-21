const router = require("express").Router();
const {
    getAll,
    create,
    deletePost,
    getOne,
    addComment,
    handleOpenPost,
    AddLikeHandler, RemoveUserLike,
} = require("../controllers/PostsController");

router.get("/", getAll);
router.get("/get-one/:id", getOne);
router.get("/open-post/:postId/:userId", handleOpenPost);
router.post("/create", create);
router.post("/add-comment/:id", addComment);
router.post("/add-like/:postId/:userId", AddLikeHandler);
router.post('/remove-like/:postId/:userId', RemoveUserLike)
router.delete("/delete/:id", deletePost);

module.exports = router;
