const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  return res.json("Post created");
});

router.get("/getAll", async (req, res) => {
  const posts = await Posts.findAll();
  return res.json(posts);
});

module.exports = router;
