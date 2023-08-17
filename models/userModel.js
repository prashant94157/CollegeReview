import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ['user', 'admin', 'reviewer'],
      default: 'user',
      required: true,
      description: 'Must be either user, reviewer or admin',
    },
    subscribedTill: {
      type: Date,
      required: true,
      default: Date.now,
    },
    about: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
