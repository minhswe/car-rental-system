import mongoose from 'mongoose';
import { ENV } from './environment.config';

const connectDB = async () => {
  try {
    const connected = await mongoose.connect(ENV.DB_URI);
    console.log(
      `Connected MongoDB: mongodb://${connected.connection.host}:${connected.connection.port}/${connected.connection.name}`
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
