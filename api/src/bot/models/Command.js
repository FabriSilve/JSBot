const Answer = require('./Answer');

// NOTE: USELESS
class Command {
  constructor(obj) {
    this.input = obj.input;
    this.regex = new RegExp(`^/${this.input}`, 'gi');
    this.answers = obj.answers
      .map(answer => new Answer(answer));
  }

  test(text) {
    return text.match(this.regex);
  }

  static match(text) {
    return text.match(/^\//gi);
  }
}

module.exports = Command;
