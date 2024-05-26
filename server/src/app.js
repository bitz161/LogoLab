//Import
const {
  likedRouter,
  postsRouter,
  commentsRouter,
} = require("./routes/community.router");
const express = require("express");

const app = express();
const cors = require("cors");

app.use(
  cors({
    //for testing purposes: add the localhost of the client for it to access the api without any cors issue
    origin: "http://localhost:8000",
  })
);

app.use(express.json());
app.use(postsRouter);

module.exports = {
  app,
};
