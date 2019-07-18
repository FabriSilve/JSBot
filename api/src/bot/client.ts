import { Request, Response } from 'express';
import axios from 'axios';

import { Trigger, ITriggerDB, ITrigger } from './models/trigger';

import { methods } from './enums';

const HTTP_INVALID_CALL = 400


export interface IBotConfigs {
  telegram?: string;
  token?: string;
  botUrl?: string;
  botDB?: string;
}

export interface IArguments {
  chatId: string;
  text?: string;
  photo?: string;
  video?: string;
  audio?: string;
  document?: string;
  parseMode?: string;
  disableNotification?: string;
}

export interface IMessage {
  chat: {
    id: string;
  };
  text: string;
}


export class Client {
  private url: string;
  // private dbUrl: string;
  private triggers: Array<ITrigger>;

  /**
   * @param telegram Destination url to call telegram methods
   * @param token Bot token needed to auth the calls
   * @param botUrl Bot url to set where telegram have to send events
   */
  constructor(configs: IBotConfigs) {
    if (!configs.telegram) throw new Error('Client need telegram url');
    if (!configs.token) throw new Error('Client need bot token');
    if (!configs.botUrl) throw new Error('Client need bot url');
    if (!configs.botDB) throw new Error('Client need bot db url');
    this.url = configs.telegram + configs.token;
    // this.dbUrl = configs.botDB;
    this.triggers = [];

    axios.post(`${this.url}/setwebhook`, { url: configs.botUrl })
    .catch(() => new Error('Impossible set webhook'));

    this.processMessage = this.processMessage.bind(this);
  }

  public loadTriggers(): void {
    Trigger.db.find({})
      .then((triggers: Array<ITriggerDB>) =>
        this.triggers = triggers
          .map((item: ITriggerDB) => new Trigger(item)),
      )
      .catch(err => { throw err; })
  }

  public async getMe(): Promise<object> {
    const { data } = await axios.get(`${this.url}/getMe`);
    return data;
  }

  public async processMessage(req: Request, res: Response): Promise<void> {
    const message: IMessage = req.body.message;
    if (!message) {
      res.status(HTTP_INVALID_CALL).json({ error: 'No message object in body' });
      return;
    }
    res.json({});

    // const message = new Message(received);
    const matches = this.triggers
      .filter(trigger => trigger.match(message.text));

    if (matches.length) {
      const [matched] = matches;
      const answer = matched.getAnswer();
      await this.send({
        chatId: message.chat.id,
        [answer.type]: answer.value,
      });
    }
  }

  private async send(args: IArguments): Promise<object> {
    const body = {
    ...args,
    chat_id: args.chatId,
    disable_notification: args.disableNotification || false,
    parse_mode: args.parseMode || 'Markdown',
    };
    if ('text' in args) return await this.call(methods.TEXT, body);
    else if ('audio' in args) return await this.call(methods.AUDIO, body);
    else if ('video' in args) return await this.call(methods.VIDEO, body);
    else if ('document' in args) return await this.call(methods.DOCUMENT, body);
    throw new Error('Missing content field');
  }

  private async call(method: string, body: object): Promise<object> {
    const { data } = await axios.post(`${this.url}${method}`, body);
    return data;
  }
}
