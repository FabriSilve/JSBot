import { TriggerDB } from '../bot/models/trigger';

import {
  triggerTypes,
  answerTypes,
} from '../bot/enums';

const triggers = [{
  answers: [{
    type: answerTypes.TEXT,
    value: 'text 1',
  }],
  input: 'text',
  type: triggerTypes.COMMAND,
}, {
  answers: [{
    type: answerTypes.TEXT,
    value: 'text 1',
  }, {
    type: answerTypes.TEXT,
    value: 'text 2',
  }],
  input: 'random',
  type: triggerTypes.COMMAND,
}, {
  answers: [{
    type: answerTypes.AUDIO,
    value: 'https://ccrma.stanford.edu/~jos/mp3/gtr-nylon22.mp3',
  }],
  input: 'audio',
  type: triggerTypes.COMMAND,
}, {
  answers: [{
    type: answerTypes.TEXT,
    value: 'answer',
  }],
  input: 'regex',
  type: triggerTypes.REGEX,
}];

export const seed = async () => {
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
