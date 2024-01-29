const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require("../models");

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      email: email,
      password: hash,
    });
  });
  return res.json("User added!");
});

router.get("/getAll", async (req, res) => {
  const users = await Users.findAll();
  res.json(users);
});

module.exports = router;
