const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const handlerTypes = {
  COMMAND: 'command',
  REGEX: 'regex',
};

const answerTypes = {
  TEXT: 'text',
};

const AnswerSchema = new mongoose.Schema({
  value: String,
  answerType: { type: String, enum: Object.values(answerTypes), default: answerTypes.TEXT },

  key: String,
  arguments: { type: Boolean, default: false },
  premium: { type: Boolean, default: false },
});

const HandlerSchema = new mongoose.Schema({
  input: { type: String, required: true },
  answers: { type: [AnswerSchema], required: true },
  handlerType: { type: String, enum: Object.values(handlerTypes), required: true },

  premium: { type: Boolean, default: false },
  service: { type: String, enum: Object.values(handlerTypes) },
  channel: { type: Boolean, default: false },
});

HandlerSchema.methods.isMatching = function isMatching(text) {
  switch (this.handlerType) {
    case handlerTypes.COMMAND:
      return new RegExp(`/${this.input}.*`, 'gi').test(text);
    case handlerTypes.REGEX:
      return new RegExp(`(^${this.input} .*|.* ${this.input}$|.* ${this.input} .*)`, 'gi')
        .test(text);
    default:
      return false;
  }
};

const Handler = mongoose.model('Handler', HandlerSchema);

module.exports = Handler;
