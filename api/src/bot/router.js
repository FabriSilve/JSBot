const { Router } = require('express');
const asyncMiddleware = require('../utils/asyncMiddleware');
const parseData = require('./utils/parseData');

const getMe = require('./handlers/getMe');
const handleRequest = require('./handlers/handleRequest');
const commands = require('./handlers/commands');

const Bot = require('./client');

Bot.setWebhook();
const botRouter = Router();

botRouter.get('/', asyncMiddleware(getMe));

botRouter.post(
  '/',
  asyncMiddleware(parseData),
  asyncMiddleware(commands),
  asyncMiddleware(handleRequest),
);

module.exports = botRouter;
