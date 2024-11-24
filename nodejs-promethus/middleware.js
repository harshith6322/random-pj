import client from "prom-client";

// Create a counter metric
const requestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

const activeRequestsGauge = new client.Gauge({
  name: "active_requests",
  help: "Number of active requests",
});

const httpRequestDurationMicroseconds = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000], // Define your own buckets here
});
//-------
// export const cleanupMiddleware = (req, res, next) => {
//   if (req.path === "/metrics") return next(); // Skip metrics endpoint

//   activeRequestsGauge.inc(); // Increment active request count
//   const startTime = Date.now();

//   res.on("finish", () => {
//     activeRequestsGauge.dec(); // Decrement active request count
//     const endTime = Date.now();
//     console.log(`Request took ${endTime - startTime}ms`);

//     // Increment request counter with labels
//     requestCounter.inc({
//       method: req.method,
//       route: req.route ? req.route.path : req.path,
//       status_code: res.statusCode,
//     });
//   });

//   res.on("error", (err) => {
//     console.error("Error occurred:", err);
//     activeRequestsGauge.dec(); // Ensure decrement on error
//   });

//   next(); // Continue to the next middleware
// };
//------
export const metricsMiddleware = (req, res, next) => {
  if (req.path === "/metrics") return next();
  activeRequestsGauge.inc();
  const startTime = Date.now();

  res.on("finish", function () {
    activeRequestsGauge.dec();
    const endTime = Date.now();
    const duration = endTime - startTime;

    // Increment request counter
    requestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    });

    httpRequestDurationMicroseconds.observe(
      {
        method: req.method,
        route: req.route ? req.route.path : req.path,
        code: res.statusCode,
      },
      duration
    );
  });
  next();
};
