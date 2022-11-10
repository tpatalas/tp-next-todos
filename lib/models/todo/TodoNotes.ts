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
    require: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
});

TodoNoteSchema.index({ title_id: 1, user_id: -1 }, { unique: true });
export default mongoose.models['Todo-Notes'] || mongoose.model('Todo-Notes', TodoNoteSchema);
