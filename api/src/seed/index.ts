import connectMongoose from '../utils/connectMongoose';
import triggers from './triggers';

const runSeeds = async () => {
  await connectMongoose();
  await triggers();
  process.exit();
};

runSeeds();

export default runSeeds;