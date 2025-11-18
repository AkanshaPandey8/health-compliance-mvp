import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  steps: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  sleep: {
    type: Number,
    required: true,
    min: 0,
    max: 24,
    default: 0
  },
  water: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  notes: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Compound index for userId and date
goalSchema.index({ userId: 1, date: -1 });

const Goal = mongoose.model('Goal', goalSchema);

export default Goal;
