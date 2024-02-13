//Resources
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");

app.use(express.json());

app.use(cors());

//Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const userRouter = require("./routes/Users");
app.use("/users", userRouter);

const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

//Server init
db.sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("Server running on port 8080. http://localhost:8080");
  });
});
