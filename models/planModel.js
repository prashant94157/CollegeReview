import mongoose from 'mongoose';

const planSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  price: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  planType: {
    type: String,
    required: true,
    default: 'not-free', // 'free'
  },
});

const Plan = mongoose.model('Plan', planSchema);
export default Plan;
