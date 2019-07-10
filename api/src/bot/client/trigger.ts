import { IAnswer } from './answer';
import { triggerTypes } from './enums';

export interface ITrigger {
  input: string,
  answers: Array<IAnswer>,
  type: triggerTypes,

  match: (text : string) => boolean;
  getAnswer: () => IAnswer;
}

class Trigger implements ITrigger {
  input: string;
  answers: Array<IAnswer>;
  type: triggerTypes;

  constructor(input : string, answers : Array<IAnswer>, type: triggerTypes) {
    this.input = input;
    this.answers = answers;
    this.type = type;
  }

  match(text : string) {
    switch (this.type) {
      case triggerTypes.COMMAND:
        return new RegExp(`/${this.input}.*`, 'gi').test(text);
      case triggerTypes.REGEX:
        return new RegExp(`(^${this.input} .*|.* ${this.input}$|.* ${this.input} .*)`, 'gi')
          .test(text);
      default:
        return false;
    }
  }

  getAnswer() {
    console.log(this.answers.length);
    const randomIndex = Math.round(Math.random() * (this.answers.length - 1));
    console.log(randomIndex);
    return this.answers[randomIndex];
  }
}

export default Trigger;