import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';
import Plan from '../models/planModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user and get token
// @route   POST /api/v1/users/login
// @access  public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    return res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      token,
    });
  }

  res.status(401);
  throw new Error('Invalid credentials!!');
});

// @desc    Register new user
// @route   POST /api/v1/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid user data!!');
  }
});

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  private(user)
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error('User not Found');
  }
});

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private(user)
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // console.log(req.user._id);
  if (user) {
    if (req.body.email) {
      const userExists = await User.findOne({ email: req.body.email });

      if (userExists && userExists._id !== req.user._id) {
        res.status(400);
        throw new Error('Email already exists');
      }
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      userType: updatedUser.userType,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/v1/users, optional = ?pageNumber=2
// @access  Private(reviewer + admin)
const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const count = await User.count({});
  const users = await User.find({})
    .select('-password')
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ users, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private(user)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (
    user &&
    (req.user.userType === 'admin' || req.user._id.equals(req.params.id))
  ) {
    await user.deleteOne();
    res.json({ message: 'User removed successfully!!!' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/v1/users/:id
// @access  Private(admin + reviewer)
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private(user)
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (
    user &&
    (req.user.userType === 'admin' || req.user._id.equals(req.params.id))
  ) {
    user.name = req.body.name || user.name;
    if (req.body.email) {
      const user2 = await User.findOne({ email: req.body.email });
      if (user2 && !user2._id.equals(user._id)) {
        res.status(404);
        throw new Error('Email already exits');
      }
      user.email = req.body.email;
    }
    user.password = req.body.password || user.password;
    if (req.user.userType === 'admin')
      user.userType = req.body.userType || user.userType;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      userType: updatedUser.userType,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Subscribe user
// @route   PATCH /api/v1/users/:id/plans/:plan_id
// @access  Private(reviewer + admin)
const updateUserSubscription = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const plan = await Plan.findById(req.params.plan_id);

  if (user && plan) {
    let subscribedDate = new Date(user.subscribedTill);
    subscribedDate.setDate(subscribedDate.getDate() + plan.days);

    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + plan.days);

    if (currentDate > subscribedDate) {
      user.subscribedTill = currentDate;
    } else {
      user.subscribedTill = subscribedDate;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      userType: updatedUser.userType,
      subscribedTill: updatedUser.subscribedTill,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  updateUserSubscription,
};
