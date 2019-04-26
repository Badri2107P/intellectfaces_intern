const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  id: String,
  Title: String,
  Content: String,
  Tags: Array,
  Author: String,
  PostedOn: String
});

var Post = mongoose.model("posts", PostSchema);

module.exports = Post;
