/* eslint-disable no-console */
const mongoose = require('mongoose');
const configs = require('../configs');

let numOfTry = 0;
const MAX_TRY = 3;

// Retry connection
const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  return mongoose.connect(configs.mongo.uri, configs.mongo.options);
};

// Exit application on error
mongoose.connection.on('error', (err) => {
  console.log(`MongoDB connection error: ${err}`);
  setTimeout(connectWithRetry, 3000);
  numOfTry += 1;
  if (numOfTry > MAX_TRY) process.exit(-1);
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB is connected');
});

if (configs.env !== 'production') {
  // mongoose.set('debug', true);
}

const connectMongoose = () => {
  connectWithRetry();
};


module.exports = connectMongoose;