const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../middlewares/Auth");

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  return res.json("Post created");
});

router.get("/getAll", validateToken, async (req, res) => {
  const userId = req.user.id;
  const likedPosts = await Likes.findAll({
    where: {
      UserId: userId,
    },
  });

  // Include produces an inner join between tables
  const posts = await Posts.findAll({ include: [Likes] });

  return res.json({ posts, likedPosts });
});

router.get("/user/:username", async (req, res) => {
  const username = req.params.username;

  const posts = await Posts.findAll({
    where: {
      username: username,
    },
  });

  return res.json(posts);
});

module.exports = router;
