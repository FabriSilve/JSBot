import mongoose from 'mongoose';
import configs from '../configs';

let numOfTry = 0;
const MAX_TRY = 3;

const { uri, options } = configs.mongo;

// Retry connection
const connectWithRetry = () => mongoose.connect(uri, options);

// Exit application on error
mongoose.connection.on('error', () => {
  setTimeout(connectWithRetry, 3000);
  numOfTry += 1;
  if (numOfTry > MAX_TRY) process.exit(-1);
});

if (configs.env !== 'production') {
  // mongoose.set('debug', true);
}

const connectMongoose = () => {
  connectWithRetry();
};


export default connectMongoose;
