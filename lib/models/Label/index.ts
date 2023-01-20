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
  user_id: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
});
LabelSchema.index({ _id: 1, parent_id: 1, title_id: 1, user_id: -1 }, { unique: true });

export default mongoose.models['Labels'] || mongoose.model('Labels', LabelSchema);
