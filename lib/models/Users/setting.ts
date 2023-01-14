import mongoose from 'mongoose';
import { ObjectID } from 'bson';

const SettingSchema = new mongoose.Schema({
  _id: {
    type: ObjectID,
    required: true,
  },
  createdDate: {
    type: Date,
    required: false,
    default: new Date().toISOString(),
  },
  userId: { type: ObjectID, required: true, unique: true },
});

export default mongoose.models.Setting || mongoose.model('Setting', SettingSchema);
