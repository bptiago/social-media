const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, bod, password } = req.body;

  //already registered?
  const dbUser = await Users.findOne({ where: { username: username } });

  if (dbUser) {
    return res.json({
      registered: true,
    });
  }

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      bod: bod,
      password: hash,
    });
  });
  return res.json("User added!");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    return res.json({ error: "Username not registrated." });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      return res.json({
        error: "Incorrect password and username combination.",
      });
    }

    // JWT generation. Will encrypt both userID and username
    const token = jwt.sign(
      { id: user.id, username: user.username },
      "AS]ipn*d!puXk4k"
    );

    return res.json({ token: token });
  });
});

router.get("/getAll", async (req, res) => {
  const users = await Users.findAll();
  res.json(users);
});

module.exports = router;
