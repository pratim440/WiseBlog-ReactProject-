const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  email: String,
  name: String,
  title: { type: String, required: true },
  desc: { type: String, required: true },
  imgUrl: String,
  likes: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Blog = new mongoose.model("Blog", blogSchema);

module.exports = Blog;
