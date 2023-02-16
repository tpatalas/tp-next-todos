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
    default: Date.now,
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
});

TodoNoteSchema.index({ deleted: 1, update: 1, title_id: 1, user_id: -1 }, { unique: true });
TodoNoteSchema.index({ note: 'text' });

export default mongoose.models['Todo-Notes'] || mongoose.model('Todo-Notes', TodoNoteSchema);
