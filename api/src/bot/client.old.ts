import { Request, Response } from 'express';
import axios from 'axios';

interface IArguments {
  chatId: string
  text?: string
  photo?: string
  video?: string
  audio?: string
  document?: string
  parseMode?: string
  disableNotification?: string
}

enum Methods {
  SET_WEBHOOK = '/setwebhook',
  GET_ME = '/getMe',
  TEXT = '/sendMessage',
  VIDEO = '/sendVideo',
  AUDIO = '/sendAudio',
  DOCUMENT = '/sendDocument'
}

enum AnswerTypes {
  TEXT = 'text',
}

enum TriggerTypes {
  COMMAND = 'command',
  REGEX = 'regex',
}

interface IAnswer {
  value: string,
  type: AnswerTypes,
}

interface ITrigger {
    input: string,
    answers: Array<IAnswer>,
    type: TriggerTypes,

    match: (text : string) => boolean;
}

interface IMessage {
  chat: {
    id: string,
  },
  text: string,
}

class Answer implements IAnswer {
  value: string;
  type: AnswerTypes;

  constructor(value: string, type: AnswerTypes) {
    this.value = value;
    this.type = type;
  }
}

class Trigger implements ITrigger {
  input: string;
  answers: Array<IAnswer>;
  type: TriggerTypes;

  constructor(input : string, answers : Array<IAnswer>, type: TriggerTypes) {
    this.input = input;
    this.answers = answers;
    this.type = type;
  }

  match(text : string) {
    switch (this.type) {
      case TriggerTypes.COMMAND:
        return new RegExp(`/${this.input}.*`, 'gi').test(text);
      case TriggerTypes.REGEX:
        return new RegExp(`(^${this.input} .*|.* ${this.input}$|.* ${this.input} .*)`, 'gi')
          .test(text);
      default:
        return false;
    }
  }
}

class Message {
  chatId: string;
  text: string;

  constructor(message : IMessage) {
    this.chatId = message.chat.id;
    this.text = message.text;
  }
}

interface IBotConfigs {
  telegram?: string,
  token?: string,
  botUrl?: string,
}


const simpleAnswer = new Answer('Ciao mamma', AnswerTypes.TEXT);
const simpleTrigger = new Trigger('start', [simpleAnswer], TriggerTypes.COMMAND);

class Client {
  url: string;
  triggers: Array<ITrigger>;
  
  /**
   * @param telegram Destination url to call telegram methods
   * @param token Bot token needed to auth the calls
   * @param botUrl Bot url to set where telegram have to send events
   */
  constructor (configs : IBotConfigs) {
    if (!configs.telegram) throw new Error('Client need telegram url');
    if (!configs.token) throw new Error('Client need bot token');
    if (!configs.botUrl) throw new Error('Client need bot url');
    this.url = configs.telegram + configs.token;
    this.triggers = [simpleTrigger];

    axios.post(`${this.url}/setwebhook`, { url: configs.botUrl })
    .catch(() => new Error('Impossible set webhook'));

    this.processMessage = this.processMessage.bind(this);
  }

  setTriggers(triggers : [ITrigger]) {
    this.triggers = triggers;
  }

  addTrigger(trigger : ITrigger) {
      this.triggers.push(trigger);
  }

  async getMe() : Promise<object> {
    const { data } = await axios.get(`${this.url}/getMe`);
    return data;
  }

  async send(args: IArguments) : Promise<object> {
    const body = {
    ...args,
    chat_id: args.chatId,
    parse_mode: args.parseMode || 'Markdown',
    disable_notification: args.disableNotification || false,
    };
    if ('text' in args) return await this.call(Methods.TEXT, body);
    else if ('audio' in args) return await this.call(Methods.AUDIO, body);
    else if ('video' in args) return await this.call(Methods.VIDEO, body);
    else if ('document' in args) return await this.call(Methods.DOCUMENT, body);
    throw new Error('Missing content field');
  }

  private async call(method : string, body : object) : Promise<object> {
    const { data } = await axios.post(`${this.url}${method}`, body);
    return data;
  }

  async processMessage(req : Request, res : Response) : Promise<void> {
    const { message: received } = req.body;
    if (!received) {
      res.status(400).json({ error: 'No message object in body' });
      return;
    }
    res.json({});

    const message = new Message(received);
    const matches = this.triggers.filter(trigger => trigger.match(message.text));

    if (matches.length > 0) {
      const [matched] = matches;
      const [answer] = matched.answers;
      await this.send({
        chatId: message.chatId,
        [answer.type]: answer.value,
      });
    }
  }
}

export default Client;
