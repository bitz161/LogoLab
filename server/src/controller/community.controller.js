const { posts, liked, comments } = require("../models/community.model");

function getAllPost(req, res) {
  return res.status(200).json(posts);
}

function getAllLiked(req, res) {
  return res.status(200).json(liked);
}

function getAllComments(req, res) {
  return res.status(200).json(comments);
}

module.exports = { getAllComments, getAllLiked, getAllPost };
