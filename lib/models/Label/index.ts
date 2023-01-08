import mongoose from 'mongoose';

const LabelSchema = new mongoose.Schema({
  parent_id: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  title_id: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});
LabelSchema.index({ parent_id: 1, title_id: 1, user_id: -1 }, { unique: true });

export default mongoose.models['Labels'] || mongoose.model('Labels', LabelSchema);
