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

//Server init
db.sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("Server running on port 8080. http://localhost:8080");
  });
});
