const configs = {
  // GLOBAL
  env: process.env.ENV || 'dev',
  serverPort: process.env.PORT || '6200',
  telegramUrl: process.env.TELEGRAM_URL,
  // DB
  mongo: {
  uri: process.env.MONGO_URL || 'mongodb://mongodb:27017/test',
  options: {
  promiseLibrary: Promise,
  useCreateIndex: true,
  useNewUrlParser: true,
  },
  },
  bot: {
  url: process.env.BOT_URL,
  }

};

export default configs;
