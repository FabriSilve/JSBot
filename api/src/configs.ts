export const configs = {
  // DB
  bot: {
    botDB: process.env.BOT_DB || "mongodb://mongodb:27017/dev",
    botUrl: process.env.BOT_URL,
    telegram: process.env.TELEGRAM_URL,
    token: process.env.BOT_TOKEN,
  },
  // GLOBAL
  env: process.env.ENV || "dev",
  serverPort: process.env.PORT || "6200",
  telegramUrl: process.env.TELEGRAM_URL,
  mongo: {
    options: {
      promiseLibrary: Promise,
      useCreateIndex: true,
      useNewUrlParser: true,
    },
    uri: process.env.MONGO_URL || "mongodb://mongodb:27017/dev",
  },
};

