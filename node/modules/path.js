const path = require("node:path");

console.log(__dirname); //current path to dir
console.log(__filename); //current path to file
console.log(path.basename(__dirname)); //dir name
console.log(path.basename(__filename)); //file name
console.log(path.extname(__dirname)); //""
console.log(path.extname(__filename)); //.js
console.log(path.parse(__dirname)); // an {}
console.log(path.parse(__filename)); //an {}
console.log(path.format(path.parse(__dirname))); //current path to dir
console.log(path.format(path.parse(__filename))); //current path to file
console.log(path.isAbsolute(__dirname)); // true
console.log(path.isAbsolute(__filename)); //true

//join
console.log("joins");
console.log(path.join("folder1", "folder2", "index.html"));
console.log(path.join("/folder1", "folder2", "index.html"));
console.log(path.join("/folder1", "//folder2", "index.html"));
console.log(path.join("/folder1", "//folder2", "../index.html"));
console.log(path.join(__dirname, "data.json"));

//resolve
console.log("resolve");
console.log(path.resolve("folder1", "folder2", "index.html"));
console.log(path.resolve("/folder1", "folder2", "index.html"));
console.log(path.resolve("/folder1", "//folder2", "index.html"));
console.log(path.resolve("/folder1", "//folder2", "../index.html"));
console.log(path.resolve(__dirname, "data.json"));
