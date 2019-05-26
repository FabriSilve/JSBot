const Message = require('../models/Message');

const parseData = (req, _, next) => {
  const { message } = req.body;
  console.log(req.body);
  if (!message) return;
  req.message = new Message(message);
  next();
};

module.exports = parseData;
