import mongoose from 'mongoose';
import { ObjectID } from 'bson';

const UserSchema = new mongoose.Schema({
  _id: {
    type: ObjectID,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
