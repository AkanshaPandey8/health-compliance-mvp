import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dayOfWeek: {
    type: Number,
    required: true,
    min: 0,
    max: 6 // 0 = Sunday, 6 = Saturday
  },
  startTime: {
    type: String,
    required: true // Format: "09:00"
  },
  endTime: {
    type: String,
    required: true // Format: "17:00"
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Ensure no overlapping availability for same provider on same day
availabilitySchema.index({ providerId: 1, dayOfWeek: 1, startTime: 1 });

const Availability = mongoose.model('Availability', availabilitySchema);

export default Availability;
