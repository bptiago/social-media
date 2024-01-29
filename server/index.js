const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors());

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
