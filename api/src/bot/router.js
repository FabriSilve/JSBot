const { Router } = require('express');
const Bot = require('./client');

const botRouter = Router();

botRouter.get('/', async (req, res) => {
  const data = await Bot.getMe();
  res.json(data);
});

botRouter.post('/', async (req, res) => {
  const chatId = req.body.message.chat.id;
  const sentMessage = req.body.message.text;
  if (sentMessage.match(/hello/gi)) {
    const data = {
      chatId,
      message: 'hello back',
    };
    await Bot.sendMessage(data);
  }
  res.json({});
});

module.exports = botRouter;
