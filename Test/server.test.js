const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Blog Platform!');
});

test('GET / responds with "Welcome to the Blog Platform!"', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(200);
  expect(response.text).toBe('Welcome to the Blog Platform!');
});
