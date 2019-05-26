const Bot = require('../client');

const handleResponse = async (req, res) => {
  const chatId = req.body.message.chat.id;
  const data = {
    chatId,
    message: 'hello back',
  };
  await Bot.sendMessage(data);
  res.json({});
};

module.exports = handleResponse;
