import asyncHandler from 'express-async-handler';

import College from '../models/collegeModel.js';
import Review from '../models/reviewModel.js';

// @desc    Create college
// @route   POST /api/v1/colleges
// @access  private(user)
const createCollege = asyncHandler(async (req, res) => {
  const { name, city, state, country } = req.body;

  const collegeExists = await College.findOne({ name, city, state, country });

  if (collegeExists) {
    res.status(400);
    throw new Error('College already exists');
  }

  let college = await College.create({
    name,
    city,
    state,
    country,
    createdBy: req.user._id,
  });

  if (college) {
    res.status(201).json({
      _id: college.id,
      name: college.name,
      city: college.city,
      state: college.state,
      country: college.country,
      createdBy: college.createdBy,
      isApproved: college.isApproved,
      approvedBy: college.approvedBy,
      avgRating: college.avgRating,
      totalReviews: college.totalReviews,
    });
  } else {
    res.status(401);
    throw new Error('Invalid College data!!');
  }
});

// @desc    Update college which is unapproved by user, reviewer but admin can update college in all cases
// @route   PUT /api/v1/colleges/:id
// @access  private(user)
const updateCollege = asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id);

  if (college) {
    if (
      !(
        req.user.userType === 'admin' ||
        (college.isApproved === false &&
          (req.user.userType === 'reviewer' ||
            college.createdBy.equals(req.user._id)))
      )
    ) {
      res.status(404);
      throw new Error('You have not enough access to update college!!!');
    }

    college.name = req.body.name || college.name;
    college.city = req.body.city || college.city;
    college.state = req.body.state || college.state;
    college.country = req.body.country || college.country;

    const updatedCollege = await college.save();

    res.status(201).json({
      _id: updatedCollege.id,
      name: updatedCollege.name,
      city: updatedCollege.city,
      state: updatedCollege.state,
      country: updatedCollege.country,
      createdBy: updatedCollege._id,
      isApproved: updatedCollege.isApproved,
      approvedBy: updatedCollege.approvedBy,
    });
  } else {
    res.status(404);
    throw new Error('College not found!!!');
  }
});

// @desc    Delete college which is unapproved by user, reviewer but admin can delete college even through it is approved
// @route   DELETE /api/v1/colleges/:id
// @access  private(admin, reviewer, user(created))
const deleteCollege = asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id);

  if (college) {
    if (
      req.user.userType === 'admin' ||
      (college.isApproved === false &&
        (req.user.userType === 'reviewer' ||
          college.createdBy.equals(req.user._id)))
    ) {
      await college.deleteOne();

      res.json({ message: 'College removed successfully!!!' });
    } else {
      res.status(404);
      throw new Error('You have not enough access to delete college!!!');
    }
  } else {
    res.status(404);
    throw new Error('College not found!!!');
  }
});

// @desc    read all approved colleges for user
// @route   GET /api/v1/colleges
// @access  private(subscribed User, reviewer, admin)
const getApprovedColleges = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pagenumber) || 1;

  const options = req.query.keyword
    ? {
        isApproved: {
          $eq: true,
        },
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {
        isApproved: {
          $eq: true,
        },
      };

  const count = await College.count({ ...options });
  const colleges = await College.find({ ...options })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ colleges, page, pages: Math.ceil(count / pageSize) });
});

// @desc    read all disapproved colleges for user
// @route   GET /api/v1/colleges/disapproved
// @access  private(User, reviewer, admin)
const getDisapprovedColleges = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const options =
    req.user.userType === 'user'
      ? {
          isApproved: {
            $eq: false,
          },
          createdBy: {
            $eq: req.user._id,
          },
        }
      : {
          isApproved: {
            $eq: false,
          },
        };

  const count = await College.count({ ...options });
  const colleges = await College.find({ ...options })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ colleges, page, pages: Math.ceil(count / pageSize) });
});

// @desc    read college
// @route   GET /api/v1/colleges/:id
// @access  private(admin + reviewer + subscribed User)
const getCollegeById = asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id)
    .populate('disapprovedReviews')
    .populate('approvedReviews');

  if (college) {
    if (
      req.user.userType !== 'user' ||
      college.isApproved === true ||
      college.createdBy === req.user._id
    ) {
      res.json(college);
    } else {
      res.status(404);
      throw new Error('You have not enough access to read college!!!');
    }
  } else {
    res.status(404);
    throw new Error('College not found!!!');
  }
});

// @desc    Approve college
// @route   PATCH /api/v1/colleges/:id
// @access  private(admin, reviewer)
const approveCollege = asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id);

  if (college) {
    if (college.isApproved) {
      res.status(404);
      throw new Error('College is already approved!!!');
    } else if (req.user.userType === 'user') {
      res.status(404);
      throw new Error("You don't have enough access to approve college!!!");
    } else {
      college.isApproved = true;
      college.approvedBy = req.user._id;

      await college.save();

      res.json({ message: 'College approved successfully!!!' });
    }
  } else {
    res.status(404);
    throw new Error('College not found!!!');
  }
});

// @desc    Disapprove college
// @route   PATCH /api/v1/colleges/:id/disapprove
// @access  private(admin, reviewer)
const disapproveCollege = asyncHandler(async (req, res) => {
  const college = await College.findById(req.params.id);

  if (college) {
    if (college.isApproved === false) {
      res.status(404);
      throw new Error('College is already disapproved!!!');
    } else if (
      req.user.userType === 'user' ||
      (req.user.userType === 'reviewer' &&
        !req.user._id.equals(college.approvedBy))
    ) {
      res.status(404);
      throw new Error("You don't have enough access to disapprove college!!!");
    } else {
      college.isApproved = false;

      await college.save();

      res.json({ message: 'College disapproved successfully!!!' });
    }
  } else {
    res.status(404);
    throw new Error('College not found!!!');
  }
});

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
      const { rating, description, degree, title } = req.body;

      const review = await Review.create({
        createdBy: req.user._id,
        rating,
        description,
        degree,
        title,
        college: college._id,
      });

      college.disapprovedReviews.push(review._id);

      const updatedCollege = await college.save();

      if (review && updatedCollege) {
        res.status(201).json({
          _id: review._id,
          createdBy: review.createdBy,
          rating: review.rating,
          title: review.title,
          description: review.description,
          degree: review.degree,
          college: review.college,
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
        review.title = req.body.title || review.title;
        review.rating = req.body.rating || review.rating;
        review.description = req.body.description || review.description;
        review.degree = req.body.degree || review.degree;

        updatedReview = await review.save();

        college.disapprovedReviews.push(updatedReview._id);
        await college.save();
      } else {
        review.title = req.body.title || review.title;
        review.rating = req.body.rating || review.rating;
        review.description = req.body.description || review.description;
        review.degree = req.body.degree || review.degree;
        updatedReview = await review.save();
      }

      res.status(201).json({
        id: updatedReview._id,
        createdBy: updatedReview.createdBy,
        rating: updatedReview.rating,
        title: updatedReview.title,
        description: updatedReview.description,
        degree: updatedReview.degree,
        college: updatedReview.college,
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
  createCollege,
  updateCollege,
  deleteCollege,
  getApprovedColleges,
  getDisapprovedColleges,
  approveCollege,
  disapproveCollege,
  getCollegeById,
  approveReview,
  createReview,
  deleteReview,
  disapproveReview,
  getApprovedReviews,
  getDisapprovedReviews,
  updateReview,
};
