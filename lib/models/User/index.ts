import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
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
    password: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: 8,
      maxLength: 100,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.index({ email: 'text' });

export default mongoose.models.User || mongoose.model('User', UserSchema);
