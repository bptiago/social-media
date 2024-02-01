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

  const posts = await Posts.findAll();

  return res.json({ posts, likedPosts });
});

module.exports = router;
