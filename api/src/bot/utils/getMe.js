const Bot = require('../client');

const getMe = async (req, res) => {
  const data = await Bot.getMe();
  res.json(data);
};

module.exports = getMe;
