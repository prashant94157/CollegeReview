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
      enum: ['free', 'not-free'],
      required: true,
      default: 'not-free',
      description: 'Must be either free or not-free',
    },
    about: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Plan = mongoose.model('Plan', planSchema);
export default Plan;
