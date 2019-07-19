import { Document, Model, model, Schema } from 'mongoose';

import { IAnswer } from './answer';
import { triggerTypes, answerTypes } from '../enums';


// DB Entities
export interface ITriggerDB extends Document {
  answers: Array<IAnswer>;
  input: string;
  type: triggerTypes;
}

export const TriggerSchema = new Schema({
  answers: [{
    type: {
      enum: Object.values(answerTypes),
      required: true,
      type: String,
    },
    value: {
      required: true,
      type: String,
    },
  }],
  input: {
    required: true,
    type: String,
  },
  type: {
    enum: Object.values(triggerTypes),
    required: true,
    type: String,
  },
});

export const TriggerDB = model<ITriggerDB>("Trigger", TriggerSchema);

// LOGIC Entities
export interface ITrigger {
  match(text: string): boolean;
  getAnswer(): IAnswer;
}

export class Trigger implements ITrigger {
  public static db: Model<ITriggerDB> = TriggerDB;
  private data: ITriggerDB;

  constructor(data: ITriggerDB) {
    this.data = data;
  }

  public match(text: string): boolean {
    const { type, input } = this.data;
    switch (type) {
      case triggerTypes.COMMAND:
        return new RegExp(`/${input}.*`, 'gi').test(text);
      case triggerTypes.REGEX:
        return new RegExp(`(^${input} .*|.* ${input}$|.* ${input} .*)`, 'gi')
          .test(text);
      default:
        return false;
    }
  }

  // NOTE: Can I move this logic in the answer?
  public getAnswer(): IAnswer {
    const { answers } = this.data;
    const randomIndex = Math.round(Math.random() * (answers.length - 1));
    return answers[randomIndex];
  }
}
