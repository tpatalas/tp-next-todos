import mongoose from 'mongoose';

interface OptionsTypes {
  [key: string]: boolean;
}

const connection: { isConnected: boolean | number } = { isConnected: false };

export const databaseConnect = async () => {
  if (connection.isConnected) {
    return;
  }

  const uri = process.env.MONGODB_URI;
  const options: OptionsTypes = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const db = await mongoose.connect(uri, options);

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);
};
