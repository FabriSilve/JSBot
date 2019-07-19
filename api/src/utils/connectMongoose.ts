import mongoose from 'mongoose';
import { configs } from '../configs';

let numOfTry = 0;
const MAX_TRY = 3;
const TIMEOUT_BETWEEN_TRIES = 3000;
const EXIT_CODE = -1;

const { uri, options } = configs.mongo;

// Retry connection
const connectWithRetry = () => mongoose.connect(uri, options);

// Exit application on error
mongoose.connection.on('error', () => {
  setTimeout(connectWithRetry, TIMEOUT_BETWEEN_TRIES);
  numOfTry += 1;
  if (numOfTry > MAX_TRY) process.exit(EXIT_CODE);
});

if (configs.env !== 'production') {
  // mongoose.set('debug', true);
}

export const connectMongoose = () => {
  connectWithRetry();
};
