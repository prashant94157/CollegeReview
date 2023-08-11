import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Review from '../../components/Review';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReviews } from '../../actions/reviewActions';
import { deleteUser, logout } from '../../actions/userActions';
import Spinner from '../../components/Spinner';
import Alert from '../../components/Alert';
import {
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
} from '../../constants/userConstants';

const DashboardScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { name, email } = userInfo;

  const userReviews = useSelector((state) => state.userReviews);
  const { loading, reviews, error, success } = userReviews;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = userDelete;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!success) {
      dispatch(getUserReviews());
    }
    if (deleteSuccess) {
      navigate('/');
    }
  }, [dispatch, success, deleteSuccess, navigate]);

  const deleteAccount = () => {
    if (window.confirm('Are you sure ?')) dispatch(deleteUser(userInfo._id));
  };

  return (
    <div>
      <div className='py-10 text-6xl font-bold text-center text-yellow-500'>
        Dashboard
      </div>
      {deleteError && <Alert>{deleteError}</Alert>}
      {deleteLoading ? (
        <Spinner />
      ) : (
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
      )}

      <div className='flex justify-around mb-6 text-2xl'>
        <Link
          to={`/users/${userInfo._id}/edit`}
          className='font-semibold px-3.5 py-2.5 text-yellow-300 rounded-md shadow-md hover:bg-yellow-300 hover:opacity-90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'
        >
          Edit
        </Link>
        <button
          onClick={deleteAccount}
          className='font-semibold px-3.5 py-2.5 text-yellow-300 rounded-md shadow-md hover:bg-yellow-300 hover:opacity-90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'
        >
          Delete Account
        </button>
        <Link
          to={`/colleges`}
          className='font-semibold px-3.5 py-2.5 text-yellow-300 rounded-md shadow-md hover:bg-yellow-300 hover:opacity-90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'
        >
          Add a review
        </Link>
      </div>

      <div className='px-10 pb-10 lg:px-40'>
        <div className='pb-5 border-b-2 border-gray-100'>
          <div className='pl-5 text-2xl text-yellow-500'>Recent reviews</div>
        </div>
        {error && <Alert>{error}</Alert>}
        {loading ? (
          <Spinner />
        ) : (
          <>
            {reviews.length ? (
              <div className='grid gap-4 px-10 py-5 pt-3 lg:grid-cols-2 '>
                {reviews.map((review) => (
                  <Review review={review} key={review._id} />
                ))}
              </div>
            ) : (
              <div className='flex items-center justify-center w-full h-40 text-lg '>
                <div>You have not reviewed any college!!!</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardScreen;
