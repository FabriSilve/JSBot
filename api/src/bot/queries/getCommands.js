const Command = require('../models/Command');
// NOTE: to query from the db
const items = require('../items');

// NOTE: USELESS
const commands = items
  .filter(obj => obj.handler === 'command')
  .map(obj => new Command(obj));

module.exports = commands;
