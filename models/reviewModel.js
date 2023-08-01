import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'College',
  },
  document: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 5,
  },
  description: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
