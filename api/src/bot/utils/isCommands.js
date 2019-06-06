const Handler = require('../models/Handler');

let commands = [];

const isItACommand = text => /^\/.*/gi.test(text);

const isCommand = async (req, res, next) => {
  const { text } = req.message;
  if (!commands.length) commands = await Handler.find({ handlerType: 'command' });
  if (!isItACommand(text)) return next();
  const command = commands
    .filter(com => com.isMatching(text));
  if (command.length) req.answers = command[0].answers;
  return next();
};
module.exports = isCommand;
