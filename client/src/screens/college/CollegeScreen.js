import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Review from '../../components/Review';
import { deleteCollege, getCollegeById } from '../../actions/collegeActions';
import Spinner from '../../components/Spinner';
import Alert from '../../components/Alert';

const CollegeScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const collegeDetails = useSelector((state) => state.collegeDetails);
  const collegeDelete = useSelector((state) => state.collegeDelete);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { college, error, loading } = collegeDetails;
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = collegeDelete;
  const { id } = useParams();
  const { userInfo } = userLogin;

  useEffect(() => {
    if (deleteSuccess) navigate('/dashboard');

    if (!college) dispatch(getCollegeById(id));
  }, [dispatch, college, id, deleteSuccess, navigate]);

  const deleteCollegeHandler = () => {
    if (window.confirm('Are you sure ?')) dispatch(deleteCollege(id));
  };

  return (
    <div>
      <Link to='/colleges'>Back</Link>
      {loading === undefined || loading || deleteLoading ? (
        <Spinner />
      ) : error ? (
        <Alert>{error}</Alert>
      ) : deleteError ? (
        <Alert>{deleteError}</Alert>
      ) : (
        <>
          <div className='py-10 text-6xl font-bold text-center text-yellow-500'>
            {college.name}
          </div>
          <div className='px-20 lg:px-40'>
            <div className='border-gray-100'>
              <dl className='divide-y divide-gray-100'>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6'>City</dt>
                  <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                    {college.city}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 '>Pin code</dt>
                  <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                    {college.pinCode}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 '>State</dt>
                  <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                    {college.state}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 '>Country</dt>
                  <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                    {college.country}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 '>
                    Average rating
                  </dt>
                  <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                    {college.avgRating}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 '>
                    Available Courses
                  </dt>
                  <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                    incididunt cillum culpa consequat. Excepteur qui ipsum
                    aliquip consequat sint. Sit id mollit nulla mollit nostrud
                    in ea officia proident. Irure nostrud pariatur mollit ad
                    adipisicing reprehenderit deserunt qui eu.
                  </dd>
                </div>

                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 '>About</dt>
                  <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                    {college.about}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className='flex justify-center my-3'>
            <div className='flex w-2/3 mb-6 text-2xl justify-evenly'>
              <Link
                to={`/colleges/${id}/edit`}
                className='font-semibold px-3.5 py-2.5 text-yellow-300 rounded-md shadow-md hover:bg-yellow-300 hover:opacity-90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'
              >
                Edit College
              </Link>
              <button
                onClick={deleteCollegeHandler}
                className='font-semibold px-3.5 py-2.5 text-yellow-300 rounded-md shadow-md hover:bg-yellow-300 hover:opacity-90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'
              >
                Delete College
              </button>
              <Link
                to={`/colleges/${id}/reviews/create`}
                className='font-semibold px-3.5 py-2.5 text-yellow-300 rounded-md shadow-md hover:bg-yellow-300 hover:opacity-90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'
              >
                Add a review
              </Link>
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
