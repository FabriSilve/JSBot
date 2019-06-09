class Answer {
  constructor(obj) {
    this.value = obj.answer.value;
    this.type = obj.answer.answerType;
    this.key = obj.answer.key;
    this.arguments = obj.answer.arguments;
    this.premium = obj.answer.premium;
    this.text = obj.text;
    this.input = obj.input;
  }

  getValue() {
    const { value, input, text } = this;
    if (this.arguments) {
      const arg = text.substring(text.indexOf(input) + input.length);
      return value.replace('{}', arg);
    }
    return value;
  }
}

module.exports = Answer;
