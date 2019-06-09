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

  async sendMessage({ chatId, message }) {
    const { url } = this.configs;
    const data = {
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown'
    };
    await axios.post(`${url}/sendMessage`, data);
  }
}

const { telegramUrl, botUrl } = configs;

const botConfigs = {
  url: telegramUrl,
  botUrl,
};

const Bot = new BotClient(botConfigs);
module.exports = Bot;
