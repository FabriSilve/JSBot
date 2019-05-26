const Answer = require('./Answer');

class Command {
  constructor(obj) {
    this.input = obj.input;
    this.answers = obj.answers
      .map(answer => new Answer(answer));
  }

  test(text) {
    const regex = new RegExp(`^/${this.input}`, 'gi');
    return text.match(regex);
  }

  static match(text) {
    return text.match(/^\//gi);
  }
}

module.exports = Command;
