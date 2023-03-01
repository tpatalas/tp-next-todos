import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
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
