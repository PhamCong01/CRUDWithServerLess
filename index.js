const express = require("express");
const app = express();
const cors = require("cors");
const serverLess = require("serverless-http");
const PORT = 3000;
app.use(express.json());
app.use(cors());

app.use("/", (req, res) => {
  res.send("Hello Worldjknjsdaassdad!");
});

module.exports.handler = serverLess(app);
