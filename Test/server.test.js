const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (req, res) => {
    res.send('Welcome to the Blog Platform!');
});

describe('GET /', () => {
    it('should respond with a welcome message', (done) => {
        request(app)
            .get('/')
            .expect('Welcome to the Blog Platform!', done);
    });
});
