import mongoose from 'mongoose';

const collegeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    avgRating: {
      type: Number,
      required: true,
      default: 5,
    },
    approvedReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Review',
      },
    ],
    disapprovedReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Review',
      },
    ],
    totalReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    availableCourses: [
      {
        type: String,
        required: true,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
  },
  { timestamps: true }
);

const College = mongoose.model('College', collegeSchema);
export default College;
