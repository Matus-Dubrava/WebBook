const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, require: true, unique: true },
  description: { type: String, require: true },
  content: { type: String, require: true },
  date: { type: String, require: true }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
