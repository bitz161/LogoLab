//imports
const {
  getAllComments,
  getAllLiked,
  getAllPost,
} = require("../controller/community.controller");
const express = require("express");

//routers
const postsRouter = express.Router();
const likedRouter = express.Router();
const commentsRouter = express.Router();

postsRouter.get("/posts", getAllPost);
likedRouter.get("/liked", getAllLiked);
commentsRouter.get("/comments", getAllComments);

module.exports = { postsRouter, likedRouter, commentsRouter };
