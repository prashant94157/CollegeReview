import mongoose from 'mongoose';

const planSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    price: {
      type: Number,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    planType: {
      type: String,
      required: true,
      default: 'not-free', // 'free'
    },
  },
  { timestamps: true }
);

const Plan = mongoose.model('Plan', planSchema);
export default Plan;
