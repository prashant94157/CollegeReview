import asyncHandler from 'express-async-handler';
import College from '../models/collegeModel.js';
import Review from '../models/reviewModel.js';

// @desc    create review
// @user can create review to all approved colleges but can even create to his disapproved college
// @admin & @reviewer create review
// @route   POST /api/v1/colleges/:id/reviews
// @access  private(user)
const createReview = asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id);

  if (college) {
    if (
      req.user.userType !== 'user' ||
      college.isApproved ||
      college.createdBy.equals(req.user._id)
    ) {
      const { rating, description, degree } = req.body;

      const review = await Review.create({
        createdBy: req.user._id,
        rating,
        description,
        degree,
      });

      college.disapprovedReviews.push(review._id);

      const updatedCollege = await college.save();

      if (review && updatedCollege) {
        res.status(201).json({
          id: review._id,
          createdBy: review.createdBy,
          rating: review.rating,
          description: review.description,
          degree: review.degree,
        });
      } else {
        res.status(401);
        throw new Error('Invalid Review data!!');
      }
    } else {
      res.status(404);
      throw new Error("You don't have enough access to write review");
    }
  } else {
    res.status(404);
    throw new Error('College not found!!!');
  }
});

// @desc    update review
// @route   PUT /api/v1/colleges/:id/reviews/:review_id
// @access  private(user)
const updateReview = asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id);
  const review = await Review.findById(req.params.review_id);

  if (college && review) {
    if (
      req.user.userType !== 'user' ||
      college.createdBy.equals(req.user._id)
    ) {
      let updatedReview = {};

      if (review.isApproved) {
        college.approvedReviews = college.approvedReviews.filter(
          (i) => !i.equals(review._id)
        );
        if (college.totalReviews === 1) college.avgRating = 5;
        else {
          college.avgRating =
            (college.avgRating * college.totalReviews - review.rating) /
            (college.totalReviews - 1);
        }
        college.totalReviews--;

        review.isApproved = false;
        review.rating = req.body.rating || review.rating;
        review.description = req.body.description || review.description;
        review.degree = req.body.degree || review.degree;

        updatedReview = await review.save();

        college.disapprovedReviews.push(updatedReview._id);
        await college.save();
      } else {
        review.rating = req.body.rating || review.rating;
        review.description = req.body.description || review.description;
        review.degree = req.body.degree || review.degree;
        updatedReview = await review.save();
      }

      res.status(201).json({
        id: updatedReview._id,
        createdBy: updatedReview.createdBy,
        rating: updatedReview.rating,
        description: updatedReview.description,
        degree: updatedReview.degree,
      });
    } else {
      res.status(404);
      throw new Error("You don't have enough access to write review");
    }
  } else {
    res.status(404);
    throw new Error('Review not found!!!');
  }
});

// @desc    delete review
// @route   DELETE /api/v1/colleges/:id/reviews/:review_id
// @access  private(user)
const deleteReview = asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id);
  const review = await Review.findById(req.params.review_id);

  if (college && review) {
    if (req.user.userType !== 'user' || req.user._id.equals(review.createdBy)) {
      if (review.isApproved) {
        college.approvedReviews = college.approvedReviews.filter(
          (i) => i !== review._id
        );

        if (college.totalReviews === 1) college.avgRating = 5;
        else {
          college.avgRating =
            (college.avgRating * college.totalReviews - review.rating) /
            (college.totalReviews - 1);
        }
        college.totalReviews--;
      } else {
        college.disapprovedReviews = college.disapprovedReviews.filter(
          (i) => i !== review._id
        );
      }
      await college.save();
      await review.deleteOne();
      res.status(201).json({
        message: 'Review deleted successfully!!!',
      });
    } else {
      res.status(404);
      throw new Error("You don't have enough access to write review");
    }
  } else {
    res.status(404);
    throw new Error('Review not found!!!');
  }
});

// @desc    read all approved reviews
// @route   GET /api/v1/colleges/:id/reviews
// @access  private(subscribed user)
const getApprovedReviews = asyncHandler(async (req, res) => {
  const college = await College.findOne({
    id: {
      $eq: req.params.id,
    },
    isApproved: {
      $eq: true,
    },
  })
    .select('approvedReviews')
    .populate('approvedReviews')
    .exec();

  if (college) {
    res.json({
      reviewsCount: college.approvedReviews.length,
      reviews: college.approvedReviews,
    });
  } else {
    res.status(404);
    throw new Error('College not found!!!');
  }
});

// @desc    read all disapproved reviews
// @route   GET /api/v1/colleges/:id/reviews/disapproved
// @access  private(user)
const getDisapprovedReviews = asyncHandler(async (req, res) => {
  const college = await College.findOne({
    id: {
      $eq: req.params.id,
    },
    isApproved: {
      $eq: true,
    },
  })
    .select('disapprovedReviews')
    .populate('disapprovedReviews')
    .exec();

  if (college) {
    let reviews = college.disapprovedReviews;
    if (req.user.userType === 'user') {
      reviews = college.disapprovedReviews.filter((i) =>
        i.createdBy.equals(req.user._id)
      );
    }
    res.json({
      reviewsCount: reviews.length,
      reviews,
    });
  } else {
    res.status(404);
    throw new Error('College not found!!!');
  }
});

// @desc    read review
// @route   GET /api/v1/colleges/:id/reviews/:review_id
// @access  private(admin + reviewer + subscribed User)
const getReviewById = asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id);
  const review = await Review.findById(req.params.review_id);

  if (college && review) {
    if (
      req.user.userType !== 'user' || //for admin and reviewer
      review.createdBy.equals(req.user._id) || // to view own reviews
      (college.isApproved === true && review.isApproved === true) // to view only approved reviews
    ) {
      res.json(college);
    } else {
      res.status(404);
      throw new Error('You have not enough access to read college!!!');
    }
  } else {
    res.status(404);
    throw new Error('Review not found!!!');
  }
});

// @desc    Approve review
// @route   PATCH /api/v1/colleges/:id/reviews/:review_id
// @access  private(admin, reviewer)
const approveReview = asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id);
  const review = await Review.findById(req.params.review_id);

  if (college && review) {
    //checking whether college & review exist
    if (college.isApproved) {
      // checking whether college is already approved or not
      if (review.isApproved) {
        // checking whether review is already approved or not
        res.status(404);
        throw new Error('Review is already approved!!!');
      } else if (req.user.userType === 'user') {
        // checking admin, reviewer
        res.status(404);
        throw new Error("You don't have enough access to approve college!!!");
      } else {
        //approving review
        review.isApproved = true;
        review.approvedBy = req.user._id;
        await review.save();

        //removing review from disapprovedReviews array
        college.disapprovedReviews = college.disapprovedReviews.filter(
          (i) => !i.equals(review._id)
        );

        // adding rating
        college.avgRating =
          (college.avgRating * college.totalReviews + review.rating) /
          (college.totalReviews + 1);

        // adding approveReview count
        college.totalReviews++;

        // adding review to approving array
        college.approvedReviews.push(review._id);
        await college.save();

        res.json({ message: 'College approved successfully!!!' });
      }
    } else {
      res.status(404);
      throw new Error('Approve college before approving review!!!');
    }
  } else {
    res.status(404);
    throw new Error('Review not found!!!');
  }
});

// @desc    Disapprove college
// @route   PATCH /api/v1/colleges/:id/reviews/:review_id/disapprove
// @access  private(admin, reviewer)
const disapproveReview = asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id);
  const review = await Review.findById(req.params.review_id);

  if (college && review) {
    if (college.isApproved) {
      if (review.isApproved === false) {
        res.status(404);
        throw new Error('Review is already disapproved!!!');
      } else if (req.user.userType === 'user') {
        res.status(404);
        throw new Error(
          "You don't have enough access to disapprove college!!!"
        );
      } else {
        // disapproving review
        review.isApproved = false;
        review.approvedBy = undefined;
        await review.save();

        // removing review from approving reviews array
        college.approvedReviews = college.approvedReviews.filter(
          (i) => !i.equals(review._id)
        );

        // if one review is there, so setting avgRating to 5 else removing rating from avgRating
        if (college.totalReviews === 1) college.avgRating = 5;
        else {
          college.avgRating =
            (college.avgRating * college.totalReviews - review.rating) /
            (college.totalReviews - 1);
        }

        // decreasing approved review count
        college.totalReviews--;

        // adding review to disapproved reviews array
        college.disapprovedReviews.push(review._id);
        await college.save();

        res.json({ message: 'College disapproved successfully!!!' });
      }
    } else {
      res.status(404);
      throw new Error('Approve college first!!!');
    }
  } else {
    res.status(404);
    throw new Error('Review not found!!!');
  }
});

export {
  approveReview,
  createReview,
  deleteReview,
  disapproveReview,
  getApprovedReviews,
  getReviewById,
  getDisapprovedReviews,
  updateReview,
};
