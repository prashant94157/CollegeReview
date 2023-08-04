import asyncHandler from 'express-async-handler';
import College from '../models/collegeModel.js';

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

  let college;
  if (req.user.userType === 'user') {
    college = await College.create({
      name,
      city,
      state,
      country,
      createdBy: req.user._id,
    });
  } else {
    college = await College.create({
      name,
      city,
      state,
      country,
      createdBy: req.user._id,
      isApproved: true,
      approvedBy: req.user._id,
    });
  }

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
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const options = {
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

export {
  createCollege,
  updateCollege,
  deleteCollege,
  getApprovedColleges,
  getDisapprovedColleges,
  approveCollege,
  disapproveCollege,
  getCollegeById,
};
