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

export { getReviews };
