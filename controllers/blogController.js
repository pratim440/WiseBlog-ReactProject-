const Blog = require("./../models/blogs");
const mongoose = require("mongoose");

const getBlogs = async (req, res) => {
  const allBlogs = await Blog.find().sort({ createdAt: -1 });
  res.json(allBlogs);
};

const createBlog = async (req, res) => {
  try {
    const { email, name, title, desc, imgUrl } = req.body;
    //console.log(req.body);
    const addBlog = new Blog({
      email,
      name,
      title,
      desc,
      imgUrl,
      createdAt: new Date(),
    });
    await addBlog.save();
    res.status(200).json(addBlog);
  } catch (err) {
    res.status(401).send(err.message);
  }
};

const updateBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findByIdAndUpdate(id, req.body);
    res.status(200).json(blog);
  } catch (err) {
    res.status(401).json(err.message);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.status(200).send("Blog deleted successfully");
  } catch (err) {
    console.log(err.message);
  }
};

const getBlogsOfUser = async (req, res) => {
  const allBlogsOfUser = await Blog.find({ userId: req.params.userId });
  res.json(allBlogsOfUser);
};

const likePost = async (req, res) => {
  const { email, id } = req.params;
  try {
    const blog = await Blog.findByIdAndUpdate(id, {
      $push: { likes: { $each: [email] } },
    });
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
const dislikePost = async (req, res) => {
  const { email, id } = req.params;
  try {
    const blog = await Blog.findByIdAndUpdate(id, {
      $pull: { likes: { $in: [email] } },
    });
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogsOfUser,
  likePost,
  dislikePost,
};
