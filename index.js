const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const MESSAGE = process.env.MESSAGE || "Running locally";

app.get("/", (req, res) => {
  res.send(`
    <h1>Node.js App</h1>
    <p>Message: ${MESSAGE}</p>
    <a href="/api/time">Show server time</a>
  `);
});

app.get("/api/time", (req, res) => {
  res.json({
    time: new Date(),
    environment: MESSAGE,
  });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
