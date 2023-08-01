import mongoose from 'mongoose';

const options: { [key: string]: boolean | number } = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const databaseConnect = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  if (mongoose.connection.readyState === 1) {
    // connected
    return mongoose.connection;
  }

  if (mongoose.connection.readyState === 0) {
    // disconnected
    try {
      mongoose.set('strictQuery', false);
      await mongoose.connect(uri, options);
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    }
  }

  return mongoose.connection;
};

export default databaseConnect;
