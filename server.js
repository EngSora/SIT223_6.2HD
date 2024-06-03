// server.js
const express = require('express');
const app = express();
const port = 3000;

// New Relic configuration
require('newrelic');

app.get('/', (req, res) => {
  res.send('Welcome to the Blog Platform!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
