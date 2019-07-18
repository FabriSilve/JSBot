import { TriggerDB } from '../bot/models/trigger';

import {
  triggerTypes,
  answerTypes,
} from '../bot/enums';

const triggers = [{
  input: 'text',
  type: triggerTypes.COMMAND,
  answers: [{
    value: 'text 1',
    type: answerTypes.TEXT,
  }],
}, {
  input: 'random',
  type: triggerTypes.COMMAND,
  answers: [{
    value: 'text 1',
    type: answerTypes.TEXT,
  }, {
    value: 'text 2',
    type: answerTypes.TEXT,
  }],
}, {
  input: 'audio',
  type: triggerTypes.COMMAND,
  answers: [{
    value: 'https://ccrma.stanford.edu/~jos/mp3/gtr-nylon22.mp3',
    type: answerTypes.AUDIO,
  }],
}, {
  input: 'regex',
  type: triggerTypes.REGEX,
  answers: [{
    value: 'answer',
    type: answerTypes.TEXT,
  }],
}];

export default async () => {
  const triggersPromises = triggers.map(async (trigger) => {
    const existingTrigger = await TriggerDB.findOne({ input: trigger.input, type: trigger.type });

    if (!existingTrigger) {
      await new TriggerDB(trigger).save();
    } else {
      await existingTrigger.set(trigger);
      await existingTrigger.save();
    }
  });
  await Promise.all(triggersPromises);
};