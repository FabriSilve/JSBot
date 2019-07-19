import { IAnswer } from './answer';

export interface IAnswers {
  get(): IAnswer;
}

export class Answers implements IAnswers{
  private answers: Array<IAnswer>;

  constructor(answers: Array<IAnswer>) {
    this.answers = answers;
  }

  public get(): IAnswer {
    const { answers } = this;
    const randomIndex = Math.round(Math.random() * (answers.length - 1));
    return answers[randomIndex];
  }
}
