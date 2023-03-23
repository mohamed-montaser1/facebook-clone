const router = require("express").Router();
const {
  getAll,
  create,
  deletePost,
  getOne,
  addComment,
} = require("../controllers/PostsController");

router.get("/", getAll);
router.get("/get-one/:id", getOne);
router.post("/create", create);
router.post("/add-comment/:id", addComment);
router.delete("/delete/:id", deletePost);

module.exports = router;
