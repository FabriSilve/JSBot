import { connectMongoose } from '../utils/connectMongoose';
import { seed } from './triggers';

export const runSeeds = async () => {
  await connectMongoose();
  await seed();
  process.exit();
};

runSeeds();
