const express = require("express");
const Blog = require("./../models/blogs");

const {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogsOfUser,
  likePost,
  dislikePost,
} = require("./../controllers/blogController");

const router = express.Router();

router.get("/", getBlogs);
router.get("/userBlogs/:userId", getBlogsOfUser);
router.post("/create", createBlog);
router.post("/update/:id", updateBlog);
router.post("/delete/:id", deleteBlog);
router.post("/like/:email/:id", likePost);
router.post("/dislike/:email/:id", dislikePost);

module.exports = router;
