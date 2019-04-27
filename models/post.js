const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  post_id: Number,
  title: String,
  content: String,
  tags: Array,
  author: String,
  posted_on: String,
  updated_on: String
});

var Post = mongoose.model("posts", PostSchema);

module.exports = Post;
