import asyncHandler from 'express-async-handler';

import Plan from '../models/planModel.js';

// @desc    Create plans
// @route   POST /api/v1/plans
// @access  private(admin)
const createPlan = asyncHandler(async (req, res) => {
  const { price, days, planType } = req.body;
  const plan = await Plan.create({
    price,
    days,
    planType,
    user: req.user._id,
  });

  if (plan) {
    res.status(201).json(plan);
  } else {
    res.status(401);
    throw new Error('Invalid plan data!!');
  }
});

// @desc    Update plan
// @route   PUT /api/v1/plans/:id
// @access  private(admin)
const updatePlan = asyncHandler(async (req, res) => {
  const plan = await Plan.findById(req.params.id);

  if (plan) {
    plan.price = req.body.price || plan.price;
    plan.days = req.body.days || plan.days;
    plan.planType = req.body.planType || plan.planType;
    plan.user = req.user._id;

    const updatedPlan = await plan.save();

    res.json(updatedPlan);
  } else {
    res.status(404);
    throw new Error('Plan not found');
  }
});

// @desc    Delete plan
// @route   DELETE /api/v1/plans/:id
// @access  private(admin)
const deletePlan = asyncHandler(async (req, res) => {
  const plan = await Plan.findById(req.params.id);

  if (plan) {
    await plan.deleteOne();
    res.json({ message: 'Plan removed successfully!!!' });
  } else {
    res.status(404);
    throw new Error('Plan not found');
  }
});

// @desc    Get plan by id
// @route   GET /api/v1/plans/:id
// @access  public
const getPlanByID = asyncHandler(async (req, res) => {
  const plan = await Plan.findById(req.params.id);

  if (plan) {
    res.json(plan);
  } else {
    res.status(404);
    throw new Error('Plan not found');
  }
});

// @desc    Get all plans
// @route   GET /api/v1/plans, optional = ?pageNumber=2
// @access  Public
const getPlans = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Plan.count({
    planType: {
      $eq: 'not-free',
    },
  });
  const plans = await Plan.find({
    planType: {
      $eq: 'not-free',
    },
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ plans, page, pages: Math.ceil(count / pageSize) });
});

export { createPlan, updatePlan, deletePlan, getPlanByID, getPlans };
