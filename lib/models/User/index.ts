import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  name: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  expireAt: {
    type: Date,
  },
});

// next-auth is already indexing the user's information. Additional indexing such
// as `UserSchema.index({email: text})` will cause issue with login.

UserSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.User || mongoose.model('User', UserSchema);
