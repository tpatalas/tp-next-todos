import mongoose from 'mongoose';

let cachedConnection: typeof mongoose;

export const databaseConnect = async () => {
  if (!cachedConnection) {
    const uri = process.env.MONGODB_URI;
    const options: { [key: string]: boolean | number } = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoose.set('strictQuery', false);
    cachedConnection = await mongoose.connect(uri, options);
  }

  return cachedConnection;
};
