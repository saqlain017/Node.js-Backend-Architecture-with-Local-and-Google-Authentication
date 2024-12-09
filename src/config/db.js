import mongoose from 'mongoose';
import { dbOptions } from './dbOptions.js';
import { MONGO_URI } from './env.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, dbOptions);
  } catch (err) {
    process.exit(1);
  }
};
