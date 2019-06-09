/* eslint-disable camelcase */
const axios = require('axios');
const configs = require('./configs');

class BotClient {
  constructor({ url, botUrl }) {
    this.configs = { url, botUrl };
  }

  getConfigs() {
    return this.configs;
  }

  async getMe() {
    const { url } = this.configs;
    const { data } = await axios.get(`${url}/getMe`);
    return data;
  }

  setWebhook() {
    const { url, botUrl } = this.configs;
    const data = { url: botUrl };
    axios.post(`${url}/setwebhook`, data)
      .catch(error => new Error('Impossible set webhook', error));
  }

  /**
   * Send message to Telegram chat. Can contains also optional fields of the base method.
   * @param {Object} args
   * @param {String} args.chatId   Destination chat
   * @param {String} args.text     Text of the message
   */
  async sendMessage(args) {
    await this.method('sendMessage', args);
  }

  /**
   * Send photo to Telegram chat. Can contains also optional fields of the base method.
   * @param {Object} args
   * @param {String} args.chatId    Destination chat
   * @param {String} args.photo     Url of the photo
   */
  async sendPhoto(args) {
    await this.method('sendPhoto', args);
  }

  /**
   * Send audio to Telegram chat. Can contains also optional fields of the base method.
   * @param {Object} args
   * @param {String} args.chatId    Destination chat
   * @param {String} args.audio     Url of the audio
   */
  async sendAudio(args) {
    await this.method('sendAudio', args);
  }

  /**
   * Send video to Telegram chat. Can contains also optional fields of the base method.
   * @param {Object} args
   * @param {String} args.chatId    Destination chat
   * @param {String} args.video     Url of the video
   */
  async sendVideo(args) {
    await this.method('sendVideo', args);
  }

  /**
   * Send document to Telegram chat. Can contains also optional fields of the base method.
   * @param {Object} args
   * @param {String} args.chatId    Destination chat
   * @param {String} args.document  Url of the document
   */
  async sendDocument(args) {
    await this.method('sendDocument', args);
  }

  /**
   * Base method to call a Telegram method. Args contains the body of the request:
   * chatId of destindation chat,
   * <MainField> Required based on method called,
   * [parseMode] Allow to parse the message using Markdown or HTML,
   * [disableNotification] Allow to disable the notification for the users
   *
   * @param {String} method  Telegram's method endpoint
   * @param {Object} args contains the body of the request
   */
  async method(method, args) {
    const {
      chatId: chat_id,
      parseMode: parse_mode,
      disableNotification: disable_notification,
    } = args;
    const { url } = this.configs;
    const body = {
      ...args,
      chat_id,
      parse_mode,
      disable_notification,
    };
    const { data } = await axios.post(`${url}/${method}`, body);
    return data;
  }
}

const { telegramUrl, botUrl } = configs;

const botConfigs = {
  url: telegramUrl,
  botUrl,
};

const Bot = new BotClient(botConfigs);
module.exports = Bot;
