const Command = require('../models/Command');
const items = require('../items');

const commands = items
  .filter(obj => obj.handler === 'command')
  .map(obj => new Command(obj));

module.exports = commands;
