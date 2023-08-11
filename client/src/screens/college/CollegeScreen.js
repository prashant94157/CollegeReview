import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Review from '../../components/Review';
import { getCollegeByID } from '../../actions/collegeActions';
import Spinner from '../../components/Spinner';
import Alert from '../../components/Alert';

const CollegeScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const collegeProfile = useSelector((state) => state.collegeProfile);
  const { college, error, loading } = collegeProfile;
  const { id } = useParams();
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!college || college._id !== id) dispatch(getCollegeByID(id));
  }, [dispatch, college, id]);

  return (
    <div>
      <Link to='/colleges'>Back</Link>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert>{error}</Alert>
      ) : (
        <>
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
                  <dt className='text-sm font-medium leading-6 '>
                    Email address
                  </dt>
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
                    incididunt cillum culpa consequat. Excepteur qui ipsum
                    aliquip consequat sint. Sit id mollit nulla mollit nostrud
                    in ea officia proident. Irure nostrud pariatur mollit ad
                    adipisicing reprehenderit deserunt qui eu.
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className='px-10 pb-10 lg:px-40'>
            <div className='pb-5 border-b-2 border-gray-100'>
              <div className='pl-5 text-2xl text-yellow-500'>
                Recent reviews
              </div>
            </div>

            <div className='grid gap-4 px-10 py-5 pt-3 lg:grid-cols-2 '>
              {college && college.approvedReviews.length ? (
                college.approvedReviews.map((review) => (
                  <Review
                    review={review}
                    showCollege={false}
                    key={review._id}
                  />
                ))
              ) : (
                <div className='flex items-center justify-center w-full h-40 text-lg '>
                  <div>We have no reviews for you as of now!!!</div>
                </div>
              )}
            </div>
          </div>

          {userInfo.userType === 'admin' && (
            <div className='px-10 pb-10 lg:px-40'>
              <div className='pb-5 border-b-2 border-gray-100'>
                <div className='pl-5 text-2xl text-yellow-500'>
                  Recent disapproved reviews
                </div>
              </div>

              <div className='px-10 pb-10'>
                <div className='grid gap-4 px-10 py-5 pt-3 lg:grid-cols-2 '>
                  {college && college.disapprovedReviews.length ? (
                    college.disapprovedReviews.map((review) => (
                      <Review
                        review={review}
                        showCollege={false}
                        key={review._id}
                      />
                    ))
                  ) : (
                    <div className='flex items-center justify-center w-full h-40 text-lg '>
                      <div>
                        We have no disapproved reviews for you as of now!!!
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CollegeScreen;
