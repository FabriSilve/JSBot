const commands = require('../utils/getCommands');
const Command = require('../models/Command');

const isCommand = async (req, res, next) => {
  const { text } = req.message;
  if (!Command.match(text)) return next();
  const command = commands
    .filter(com => com.test(text));
  console.log(command);
  if (command.length) console.log('defined');
  else console.log('not defined');
  return next();
};
module.exports = isCommand;
