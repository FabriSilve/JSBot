const axios = require('axios');
const configs = require('./configs');

class BotClient {
  constructor({ url, token, botUrl }) {
    this.configs = { url, token, botUrl };
  }

  getConfigs() {
    return this.configs;
  }

  async getMe() {
    const { url, token } = this.configs;
    const { data } = await axios.get(`${url}${token}/getMe`);
    return data;
  }

  setWebhook() {
    const { url, token, botUrl } = this.configs;
    const data = { url: botUrl };
    axios.post(`${url}${token}/setwebhook`, data)
      .catch(error => new Error('Impossible set webhook', error));
  }

  async sendMessage({ chatId, message }) {
    const { url, token } = this.configs;
    const data = {
      chat_id: chatId,
      text: message,
    };
    await axios.post(`${url}${token}/sendMessage`, data);
  }
}

const { telegramUrl, botToken, botUrl } = configs;

const botConfigs = {
  url: telegramUrl,
  token: botToken,
  botUrl,
};

const Bot = new BotClient(botConfigs);
module.exports = Bot;
