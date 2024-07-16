import logger from './logger';
import mongoose from 'mongoose';
import { env } from '../config';

async function db_connection() {
  const MONGO_ATLAS_URL = env.MONGO_ATLAS_URL as string;

  try {
    await mongoose.connect(MONGO_ATLAS_URL);
    logger.info('Connected to the database!');
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

export default db_connection;
