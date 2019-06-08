const express = require('express');
const bodyParser = require('body-parser');

const botRouter = require('./bot/router');
const connectMongoose = require('./utils/connectMongoose');

connectMongoose();

const server = express();
server.use(bodyParser.json());

server.get('/status', (req, res) => res.json({ status: 'OK' }));
server.use('/bot', botRouter);

module.exports = server;
