import asyncHandler from 'express-async-handler';

import Review from '../models/reviewModel.js';

// @desc    read all reviews
// @route   GET /api/v1/reviews
// @access  private(user)
const getReviews = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Review.count({
    createdBy: {
      $eq: req.user._id,
    },
  });
  const reviews = await Review.find({
    createdBy: {
      $eq: req.user._id,
    },
  })
    .populate('college', 'name')
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ reviews, page, pages: Math.ceil(count / pageSize) });
});

// @desc    read review
// @route   GET /api/v1/reviews/:id
// @access  private(admin + reviewer + subscribed User)
const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (review) {
    if (
      req.user.userType !== 'user' || //for admin and reviewer
      review.createdBy.equals(req.user._id) || // to view own reviews
      review.isApproved === true // to view only approved reviews
    ) {
      res.json(review);
    } else {
      res.status(404);
      throw new Error('You have not enough access to read college!!!');
    }
  } else {
    res.status(404);
    throw new Error('Review not found!!!');
  }
});

export { getReviews, getReviewById };
