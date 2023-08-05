import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    // document: {
    //   type: String,
    //   required: true,
    // },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: true,
    },
    title: {
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
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
