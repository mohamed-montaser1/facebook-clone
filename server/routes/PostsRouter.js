const router = require("express").Router();
const {
  getAll,
  create,
  deletePost,
} = require("../controllers/PostsController");

router.get("/", getAll);
router.post("/create", create);
router.delete("/delete/:id", deletePost);

module.exports = router;
