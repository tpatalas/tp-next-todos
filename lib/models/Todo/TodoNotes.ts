import mongoose from 'mongoose';

const TodoNoteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: false,
    trim: true,
    maxlength: 100000,
  },
  title_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
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
    required: true,
  },
  expireAt: {
    type: Date,
  },
});

TodoNoteSchema.index({ deleted: 1, title_id: 1, user_id: -1 }, { unique: true });
TodoNoteSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models['Todo-Notes'] || mongoose.model('Todo-Notes', TodoNoteSchema);
