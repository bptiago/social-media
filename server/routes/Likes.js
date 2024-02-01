const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/Auth");

router.post("/interact", validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  const found = await Likes.findOne({
    where: {
      PostId: PostId,
      UserId: UserId,
    },
  });

  if (found) {
    // User already liked
    await Likes.destroy({ where: { PostId: PostId, UserId: UserId } });
    return res.json({ newLike: false });
  } else {
    await Likes.create({ PostId: PostId, UserId: UserId });
    return res.json({ newLike: true });
  }
});

module.exports = router;
