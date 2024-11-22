// import axios from "axios";

// async function sendRequest(otp) {
//   let config = {
//     method: "get",
//     maxBodyLength: Infinity,
//     url: "http://98.84.107.93:3000",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   try {
//     const response = await axios.request(config);
//     console.log(JSON.stringify(response.status));
//   } catch (e) {
//     console.log("error");
//   }
// }

// async function main() {
//   for (let i = 1; i < 10000; i++) {
//     sendRequest();
//     console.log("here for " + i);
//   }
// }

// main();

import axios from "axios";

async function sendRequest() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://node-autoscale-1-1037842250.us-east-1.elb.amazonaws.com", // Adjust to your actual URL
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(config);
    console.log(`Response status: ${response.status}`);
  } catch (e) {
    console.log("Request error");
  }
}

async function sendBatchRequests(batchSize, maxRequests) {
  for (let i = 0; i < maxRequests; i += batchSize) {
    const requests = [];

    // Generate a batch of requests
    for (let j = 0; j < batchSize && i + j < maxRequests; j++) {
      requests.push(sendRequest());
    }

    // Wait for all requests in the current batch to complete
    await Promise.all(requests);
    console.log(`Completed batch ${Math.floor(i / batchSize) + 1}`);
  }
}

async function main() {
  const batchSize = 1000; // Number of requests in each batch
  const maxRequests = 20000; // Total number of requests to send
  await sendBatchRequests(batchSize, maxRequests);
  console.log("All requests completed");
}

// Run the main function
main();
