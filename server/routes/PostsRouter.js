const router = require("express").Router();
const {
  getAll,
  create,
  deletePost,
  getOne,
  addComment,
  handleOpenPost,
  addReactHandler,
} = require("../controllers/PostsController");

router.get("/", getAll);
router.get("/get-one/:id", getOne);
router.get("/open-post/:id", handleOpenPost);
router.post("/create", create);
router.post("/add-comment/:id", addComment);
router.post("/add-react/:reactType/:postId", addReactHandler);
router.delete("/delete/:id", deletePost);

module.exports = router;
