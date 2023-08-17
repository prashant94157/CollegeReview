import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/users.js';
import connectDB from './config/db.js';
import College from './models/collegeModel.js';
import Review from './models/reviewModel.js';
import User from './models/userModel.js';
import Plan from './models/planModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Review.deleteMany();
    await College.deleteMany();
    await Plan.deleteMany();
    await User.deleteMany();

    await User.insertMany(users);
    console.log('Data imported!!!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Review.deleteMany();
    await College.deleteMany();
    await Plan.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!!'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') destroyData();
else importData();
