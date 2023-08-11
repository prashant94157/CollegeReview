import React from 'react';
import { Link } from 'react-router-dom';

import Review from '../../components/Review';

const ReviewScreen = () => {
  return (
    <div>
      <div className='py-10 text-6xl font-bold text-center text-yellow-500'>
        Bright Way Inter College
      </div>
      <div className='px-20 lg:px-40'>
        <div className='border-gray-100'>
          <dl className='divide-y divide-gray-100'>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6'>Full name</dt>
              <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                Margot Foster
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 '>
                Application for
              </dt>
              <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                Backend Developer
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 '>Email address</dt>
              <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                margotfoster@example.com
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 '>
                Salary expectation
              </dt>
              <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                $120,000
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 '>About</dt>
              <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ReviewScreen;
