const div = document.getElementById("div");
const p = document.getElementById("p");
// div.style.backgroundColor = "black";

// main.js
let count = 0;
setInterval(() => {
  count++;
  div.textContent = count;
}, 1000);
// let count1 = 0;
// while (true) {
//   count1++;
// }
// Check if Web Workers are supported

if (window.Worker) {
  const worker = new Worker("worker.js");

  // Send data to the worker
  const number = 200; // Example large number for factorial
  worker.postMessage(number);

  // Listen for messages from the worker
  worker.onmessage = (e) => {
    console.log(`Factorial of ${number} is: ${e.data}`);
    p.textContent = e.data;
  };

  // Handle errors from the worker
  worker.onerror = (error) => {
    console.error("Worker error:", error.message);
  };

  console.log("Main thread is free to handle UI or other tasks");
} else {
  alert("Web Workers are not supported in this browser");
}
