import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
  parent_id: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  tag: {
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
TagSchema.index({ parent_id: 1, title_id: 1, user_id: -1 }, { unique: true });

export default mongoose.models['Tags'] || mongoose.model('Tags', TagSchema);
