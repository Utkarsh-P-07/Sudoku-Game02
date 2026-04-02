import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: function() { return !this.isGuest; },
    unique: true,
    sparse: true,
    lowercase: true
  },
  password: {
    type: String,
    required: function() { return !this.isGuest; }
  },
  isGuest: {
    type: Boolean,
    default: false
  },
  points: {
    type: Number,
    default: 0
  },
  gamesPlayed: {
    type: Number,
    default: 0
  },
  bestTimes: {
    easy: { type: Number, default: null },
    medium: { type: Number, default: null },
    hard: { type: Number, default: null }
  },
  badges: {
    type: [String],
    default: []
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
