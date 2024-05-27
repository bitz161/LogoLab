//Import
const {
  likedRouter,
  postsRouter,
  commentsRouter,
} = require("./routes/community.router");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(
  cors({
    //for testing purposes: add the localhost of the client for it to access the api without any cors issue
    origin: "http://localhost:8000",
  })
);

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(postsRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = {
  app,
};
