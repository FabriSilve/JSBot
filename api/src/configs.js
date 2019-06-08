const configs = {
  mongo: {
    uri: process.env.MONGO_URL || 'mongodb://mongodb:27017/test',
    options: {
      promiseLibrary: Promise,
      useCreateIndex: true,
      useNewUrlParser: true,
    },
  },
};

module.exports = configs;
