import { Document, Model, model, Schema } from 'mongoose';

import { triggerTypes, answerTypes } from '../enums';

// DB Entities
export interface ITriggerDB extends Document {
  input: string,
  answers: [{
    value: string,
    type: answerTypes,
  }],
  type: triggerTypes,
}

export const TriggerSchema = new Schema({
  input: {
    type: String,
    required: true,
  },
  answers: [{
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(answerTypes),
    },
  }],
  type: {
    type: String,
    required: true,
    enum: Object.values(triggerTypes),
  },
});

export const TriggerDB = model<ITriggerDB>("Trigger", TriggerSchema);


// LOGIC Entities
export interface ITrigger {
  data: ITriggerDB;

  match: (text : string) => boolean;
  getAnswer: () => ITriggerDB["answers"][0];
}

class Trigger implements ITrigger {
  static db : Model<ITriggerDB> = TriggerDB;
  data: ITriggerDB;

  constructor(data: ITriggerDB) {
    this.data = data;
  }

  match(text : string) {
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
  getAnswer() {
    const { answers } = this.data;
    const randomIndex = Math.round(Math.random() * (answers.length - 1));
    return answers[randomIndex];
  }
}

export default Trigger;