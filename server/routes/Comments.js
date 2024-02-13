const express = require("express");
const router = express.Router();
const { Posts, Likes, Comments } = require("../models");

router.post("/", async (req, res) => {
  const comment = req.body;
  await Comments.create(comment);
  return res.json("Comment created");
});

router.get("/getAll/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  return res.json(comments);
});

module.exports = router;
