const express = require("express");
const fs = require("node:fs");
const os = require("node:os");
const process = require("node:process");
const cluster = require("node:cluster");
const { FORM } = require("./db");

const result = os.cpus().length;
const app = express();
app.use(require("express-status-monitor")());
let count = 0;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < result; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.get("/", async (req, res) => {
    let val = count++;
    await FORM.create({
      firstname: "harshit",
      lastname: "reddy",
    });
    console.log(`id : ${process.pid}`);
    res.json({
      result,
      health: "good",
      val: val * 2 + 1,
      id: process.pid,
    });
  });

  app.listen(3000, () => {
    console.log("http://localhost:3000/");
  });
}
