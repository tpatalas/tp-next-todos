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
    type: Boolean,
    default: true,
    required: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

TodoNoteSchema.index({ update: 1, title_id: 1, user_id: -1 }, { unique: true });
TodoNoteSchema.index({ note: 'text' });

export default mongoose.models['Todo-Notes'] || mongoose.model('Todo-Notes', TodoNoteSchema);
