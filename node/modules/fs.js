const express = require("express");
const fs = require("node:fs");
const os = require("node:os");

const result = os.cpus().length;
const app = express();
app.use(require("express-status-monitor")());

app.get("/", async (req, res) => {
  const reader = fs.createReadStream("steam.txt", "utf-8");

  // Read and display the file data on console
  reader.on("data", function (chunk) {
    console.log("started");
    res.write(chunk);
  });
  reader.on("end", function (chunk) {
    console.log("ended");
    res.end();
  });
});

app.post("/", async (req, res) => {
  const data = req.body;
  const reader = fs.createWriteStream("steam.txt", "utf-8");

  // Read and display the file data on console
  reader.on("data", function (chunk) {
    console.log("started");
    res.write(chunk);
  });
  reader.on("end", function (chunk) {
    console.log("ended");
    res.end();
  });
});

app.listen(3000, () => {
  console.log("http://localhost:3000/");
});
