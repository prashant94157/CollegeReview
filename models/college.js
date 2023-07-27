import mongoose from 'mongoose';

const collegeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  avgRating: {
    type: Number,
    required: true,
  },
  reviews: [
    {
      review: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Review',
      },
    },
  ],
  availableCourses: [
    {
      type: String,
      required: true,
    },
  ],
});

const College = mongoose.model('College', collegeSchema);
export default College;
