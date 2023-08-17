import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user.active) {
        res.status(401);
        throw new Error('Not authorized, token failed');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

//check admin access rights
const admin = (req, res, next) => {
  if (req.user && req.user.userType === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

//check admin or reviewer access rights
const reviewer = (req, res, next) => {
  if (req.user && req.user.userType !== 'user') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as a reviewer');
  }
};

const subscribed = asyncHandler(async (req, res, next) => {
  if (
    req.user &&
    (req.user.userType !== 'user' || req.user.subscribedTill > Date.now)
  ) {
    next();
  } else {
    res.status(401);
    throw new Error('Subscribe to view this content!!!');
  }
});

export { protect, admin, reviewer, subscribed };
