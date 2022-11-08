import mongoose from 'mongoose';

const TodoItemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    maxlength: 200,
  },
  completed: {
    type: Boolean,
    required: false,
    default: false,
  },
  completedDate: {
    type: Date,
    required: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  createdDate: {
    type: Date,
    required: false,
    default: new Date(),
  },
  priorityLevel: {
    type: Number,
    required: false,
  },
  priorityRankScore: {
    type: Number,
    required: false,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
});
TodoItemSchema.index({ _id: 1, user_id: -1 }, { unique: true });

export default mongoose.models['Todo-Items'] || mongoose.model('Todo-Items', TodoItemSchema);
