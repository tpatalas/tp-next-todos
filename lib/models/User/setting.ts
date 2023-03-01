import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdDate: {
    type: Date,
    required: false,
    default: new Date().toISOString(),
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
  },
});

export default mongoose.models.Setting || mongoose.model('Setting', SettingSchema);
