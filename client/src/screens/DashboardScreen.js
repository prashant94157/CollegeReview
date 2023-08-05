import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Review from '../components/Review';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReviews } from '../actions/reviewActions';
import Spinner from '../components/Spinner';

const DashboardScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userReviews = useSelector((state) => state.userReviews);
  const {
    loading,
    reviews: { reviews },
    error,
    success,
  } = userReviews;

  const { name, email } = userInfo;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // if (success)
    dispatch(getUserReviews());
    // return () => {
    //   second
    // }
  }, [dispatch]);

  return (
    <div>
      <div className='py-10 text-6xl font-bold text-center text-yellow-500'>
        Dashboard
      </div>
      <div className='px-20 lg:px-40'>
        <div className='border-gray-100'>
          <dl className='divide-y divide-gray-100'>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6'>Full name</dt>
              <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                {name}
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 '>Email</dt>
              <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                {email}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className='px-10 pb-10 lg:px-40'>
        <div className='pb-5 border-b-2 border-gray-100'>
          <div className='pl-5 text-2xl text-yellow-500'>Recent reviews</div>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className='grid gap-4 px-10 py-5 pt-3 lg:grid-cols-2 '>
            {reviews.map((review) => (
              <Review review={review} key={review._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardScreen;
