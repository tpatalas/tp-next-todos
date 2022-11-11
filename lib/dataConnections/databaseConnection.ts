import mongoose from 'mongoose';

let cachedConnection: typeof mongoose;

export const databaseConnect = async () => {
  if (!cachedConnection) {
    const uri = process.env.MONGODB_URI;
    const options: { [key: string]: boolean | number } = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
      keepAliveInitialDelay: 300000, // in ms: 5 min total,
    };
    cachedConnection = await mongoose.connect(uri, options);
  }

  return cachedConnection;
};
