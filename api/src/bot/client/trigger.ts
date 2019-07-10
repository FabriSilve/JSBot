import { IAnswer } from './answer';
import { triggerTypes } from './enums';

export interface ITrigger {
  input: string,
  answers: Array<IAnswer>,
  type: triggerTypes,

  match: (text : string) => boolean;
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
}

export default Trigger;