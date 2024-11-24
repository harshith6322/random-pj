// worker.js

// Listen for messages from the main thread
self.onmessage = (e) => {
  const number = e.data;
  const result = factorial(number);
  self.postMessage(result); // Send the result back to the main thread
};

// A function to calculate factorial
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}
