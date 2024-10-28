const express = require("express");
const fs = require("node:fs");
const os = require("node:os");

const result = os.cpus().length;
const app = express();
app.use(require("express-status-monitor")());

app.get("/", async (req, res) => {
  
});

app.listen(3000, () => {
  console.log("http://localhost:3000/");
});
