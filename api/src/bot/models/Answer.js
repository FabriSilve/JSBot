class Answer {
  constructor(obj) {
    this.answer = 'hello world' || obj;
  }

  getAnswer() {
    return this.answer;
  }
}

module.exports = Answer;
