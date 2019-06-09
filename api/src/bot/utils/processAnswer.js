const Bot = require('../client');

const processAnswer = async (req) => {
  if (req.answers) {
    const chatId = req.message.chat.id;
    const data = {
      chatId,
      text: req.answers[0].value,
    };
    await Bot.sendMessage(data);
  }
};

module.exports = processAnswer;
