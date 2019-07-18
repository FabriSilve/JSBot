import { answerTypes } from '../enums';

export interface IAnswer {
  value: string;
  type: answerTypes;
}

export class Answer implements IAnswer {
  public value: string;
  public type: answerTypes;

  constructor({ value, type }: { value: string, type: answerTypes }) {
    this.value = value;
    this.type = type;
  }
}
