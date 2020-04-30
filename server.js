const express = require("express");
const logger = require("morgan");
const errorhandler = require("errorhandler");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(logger("dev"));
app.use(errorhandler());

let blogPosts = [];

app.get("/", (req, res) => {
  res.status(200).send(blogPosts);
});

app.post("/", (req, res) => {
  let newPost = {
    posts: req.body.post,
    id: blogPosts.length,
  };
  blogPosts.push(newPost);
  res.status(200).send(blogPosts);
});

app.put("/", (req, res) => {
  blogPosts.map((findpost) => {
    if (req.body.id === findpost.id) {
      findpost.posts = req.body.post;
    }
  });
  res.status(201).send(blogPosts);
});

app.delete("/", (req, res) => {
  let toDelete = blogPosts.find((findPost) => {
    if (findPost === req.body) {
      return findPost;
    }
  });
  blogPosts.splice(toDelete, 1);
  res.status(201).send(blogPosts);
});

app.listen(4000);
