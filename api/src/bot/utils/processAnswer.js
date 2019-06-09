const Bot = require('../client');
const Answer = require('../models/Answer');

const processAnswer = async (req) => {
  const {
    answers,
    chatId,
    text,
    input,
  } = req;
  if (answers) {
    const randomIndex = Math.floor(Math.random() * answers.length);
    const answer = new Answer({
      answer: answers[randomIndex],
      text,
      input,
    });
    const data = {
      chatId,
      [answer.type]: answer.getValue(),
      parseMode: 'Markdown',
    };
    await Bot.sendMessage(data);
  }
};

module.exports = processAnswer;
