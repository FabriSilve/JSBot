const configs = {
    env: process.env.ENV || 'dev',
    serverPort: process.env.PORT || '6200',
    mongo: {
        uri: process.env.MONGO_URL || 'mongodb://mongodb:27017/test',
        options: {
        promiseLibrary: Promise,
        useCreateIndex: true,
        useNewUrlParser: true,
        },
    },
};

export default configs;
