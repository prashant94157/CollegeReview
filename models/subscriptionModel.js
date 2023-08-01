import mongoose from 'mongoose';

const subscriptionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Plan',
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  },
  paidAt: {
    type: Date,
  },
  startedAt: {
    type: Date,
    required: true,
  },
  pausedAt: {
    type: Date,
  },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
