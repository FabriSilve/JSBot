const Message = require('../models/Message');

const parseData = (req, res, next) => {
  const { message } = req.body;
  if (!message) {
    res.status(400).json({ error: 'No message in body' });
    return;
  }
  res.json({});
  req.message = new Message(message);
  next();
};

module.exports = parseData;
