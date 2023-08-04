import React from 'react';
import { Link } from 'react-router-dom';

const DashboardScreen = () => {
  // rating
  // 5
  // description
  // "Very nice college"
  // degree
  // "b.tech."
  // isApproved
  // false
  return (
    <div>
      <div className='py-10 text-6xl font-bold text-center text-yellow-500'>
        Dashboard
      </div>
      <div className='px-20 lg:px-40'>
        <div class='border-gray-100'>
          <dl class='divide-y divide-gray-100'>
            <div class='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt class='text-sm font-medium leading-6'>Full name</dt>
              <dd class='mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0'>
                Margot Foster
              </dd>
            </div>
            <div class='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt class='text-sm font-medium leading-6 '>Application for</dt>
              <dd class='mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0'>
                Backend Developer
              </dd>
            </div>
            <div class='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt class='text-sm font-medium leading-6 '>Email address</dt>
              <dd class='mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0'>
                margotfoster@example.com
              </dd>
            </div>
            <div class='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt class='text-sm font-medium leading-6 '>Salary expectation</dt>
              <dd class='mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0'>
                $120,000
              </dd>
            </div>
            <div class='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt class='text-sm font-medium leading-6 '>About</dt>
              <dd class='mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0'>
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

      <div className='px-10 pb-10 lg:px-40'>
        <div className='pb-5 border-b-2 border-gray-100'>
          <div className='pl-5 text-2xl text-yellow-500'>Recent reviews</div>
        </div>

        <div className='grid gap-4 px-10 py-5 pt-3 lg:grid-cols-2 '>
          <div className='grid grid-cols-3 gap-2 px-4 shadow-md py-7 rounded-2xl'>
            <div className='col-span-2'>Bright Way Inter College</div>
            <div>&#9733;&#9733;&#9733;&#9733;&#9733;</div>

            <div className='col-span-2'>Degree</div>
            <div>Date</div>
            <div className='col-span-3 font-bold'>title</div>

            <div className='col-span-3'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Excepturi ratione aliquam, cumque quis magni doloribus ut id
              veniam incidunt ducimus, quidem molestiae. Sed, accusantium. Sunt
              unde illo possimus optio accusamus.
            </div>
          </div>
          <div className='grid grid-cols-3 gap-2 px-4 shadow-md py-7 rounded-2xl'>
            <div className='col-span-2'>Bright Way Inter College</div>
            <div>&#9733;&#9733;&#9733;&#9733;&#9733;</div>

            <div className='col-span-2'>Degree</div>
            <div>Date</div>
            <div className='col-span-3 font-bold'>title</div>

            <div className='col-span-3'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Excepturi ratione aliquam, cumque quis magni doloribus ut id
              veniam incidunt ducimus, quidem molestiae. Sed, accusantium. Sunt
              unde illo possimus optio accusamus.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
