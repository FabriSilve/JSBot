import { Request, Response } from 'express';
import axios from 'axios';

interface Arguments {
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

interface Answer {
  value: String,
  answerType?: AnswerTypes,

  arguments?: boolean,
}

interface Trigger {
    input: string,
    aswers: Array<Answer>,
    type: TriggerTypes,
}

interface Message {
  chat: {
    id: string,
  },
  text: string,
}

class Client {
  url: string;
  triggers: Array<Trigger>;
  
  /**
   * @param telegram Destination url to call telegram methods
   * @param token Bot token needed to auth the calls
   * @param botUrl Bot url to set where telegram have to send events
   */
  constructor (telegram : string, token : string, botUrl : string) {
    if (!telegram) throw new Error('Client need telegram url');
    if (!token) throw new Error('Client need bot token');
    if (!botUrl) throw new Error('Client need bot url');
    this.url = telegram + token;
    this.triggers = [];

    axios.post(`${this.url}/setwebhook`, { url: botUrl })
    .catch(() => new Error('Impossible set webhook'));
  }

  setTriggers(triggers : [Trigger]) {
    this.triggers = triggers;
  }

  addTrigger(trigger : Trigger) {
      this.triggers.push(trigger);
  }

  async getMe() : Promise<object> {
    const { data } = await axios.get(`${this.url}/getMe`);
    return data;
  }

  async send(args: Arguments) : Promise<object> {
    const body = {
    ...args,
    chat_id: args.chatId,
    parse_mode: args.parseMode || 'Markdown',
    disable_notification: args.disableNotification || false,
    };
    let method : string = '';
    if ('text' in args) return await this.call(Methods.TEXT, body);
    else if ('audio' in args) return await this.call(Methods.AUDIO, body);
    else if ('video' in args) return await this.call(Methods.VIDEO, body);
    else if ('document' in args) return await this.call(Methods.DOCUMENT, body);
    throw new Error('Missing content field');
  }

  private async call(method : string, body : object) : Promise<object> {
    const { data } = await axios.post(`${this.url}/${method}`, body);
    return data;
  }

  processMessage(req : Request, res : Response) {
    // TODO handle the request here
  }

}
