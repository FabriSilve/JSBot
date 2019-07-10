import { answerTypes } from './enums';

export interface IAnswer {
  value: string,
  type: answerTypes,
}

class Answer implements IAnswer {
  value: string;
  type: answerTypes;

  constructor(value: string, type: answerTypes) {
    this.value = value;
    this.type = type;
  }
}

export default Answer;