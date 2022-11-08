import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
  parent_id: {
    type: mongoose.Types.ObjectId,
    require: false,
  },
  tag: {
    Type: String,
    required: true,
  },
  title_id: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
});
TagSchema.index({ parent_id: 1, title_id: 1, user_id: -1 }, { unique: true });

export default mongoose.models['Tags'] || mongoose.model('Tags', TagSchema);
