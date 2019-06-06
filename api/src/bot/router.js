const { Router } = require('express');
const asyncMiddleware = require('../utils/asyncMiddleware');
const bodyParser = require('./utils/bodyParser');
const getMe = require('./utils/getMe');
const processAnswer = require('./utils/processAnswer');
const isCommands = require('./utils/isCommands');


// const Bot = require('./client');
// Bot.setWebhook();
const botRouter = Router();

botRouter.get('/', asyncMiddleware(getMe));

botRouter.post(
  '/',
  asyncMiddleware(bodyParser),
  asyncMiddleware(isCommands),
  asyncMiddleware(processAnswer),
);

module.exports = botRouter;
