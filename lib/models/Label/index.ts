import mongoose from 'mongoose';

const LabelSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  parent_id: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
  title_id: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
    },
  ],
  update: {
    type: Number,
    required: false,
  },
  deleted: {
    type: Boolean,
    default: false,
    required: false,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  expireAt: {
    type: Date,
  },
});
LabelSchema.index({ deleted: 1, update: 1, title_id: 1, user_id: -1 }, { unique: true });
LabelSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models['Labels'] || mongoose.model('Labels', LabelSchema);
