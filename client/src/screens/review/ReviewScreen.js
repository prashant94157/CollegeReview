import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, getReviewById } from '../../actions/reviewActions';
import Spinner from '../../components/Spinner';
import Alert from '../../components/Alert';

const ReviewScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const reviewDelete = useSelector((state) => state.reviewDelete);
  const reviewDetails = useSelector((state) => state.reviewDetails);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { review, error, loading } = reviewDetails;
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = reviewDelete;
  const { id: collegeId, reviewId } = useParams();
  const { userInfo } = userLogin;

  useEffect(() => {
    if (deleteSuccess) navigate(`/colleges/${collegeId}`);

    if (!review) dispatch(getReviewById(reviewId));
  }, [dispatch, review, collegeId, deleteSuccess, navigate]);

  const deleteReviewHandler = () => {
    if (window.confirm('Are you sure ?')) dispatch(deleteReview(reviewId));
  };

  return (
    <div>
      <Link to={`/colleges/${collegeId}`}>Back</Link>
      {loading === undefined || loading || deleteLoading ? (
        <Spinner />
      ) : error ? (
        <Alert>{error}</Alert>
      ) : deleteError ? (
        <Alert>{deleteError}</Alert>
      ) : (
        <div>
          <div className='py-10 text-6xl font-bold text-center text-yellow-500'>
            {review.college}
          </div>
          <div className='px-20 lg:px-40'>
            <div className='border-gray-100'>
              <dl className='divide-y divide-gray-100'>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6'>Title</dt>
                  <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                    {review.title}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 '>Rating</dt>
                  <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                    {review.rating}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 '>Degree</dt>
                  <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                    {review.degree}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 '>Created By</dt>
                  <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                    Prashant Maurya
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 '>
                    Description
                  </dt>
                  <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                    {review.description}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className='flex justify-center my-3'>
            <div className='flex w-2/3 mb-6 text-2xl justify-evenly'>
              <Link
                to={`/colleges/${collegeId}/reviews/${reviewId}/edit`}
                className='font-semibold px-3.5 py-2.5 text-yellow-300 rounded-md shadow-md hover:bg-yellow-300 hover:opacity-90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'
              >
                Edit Review
              </Link>
              <button
                onClick={deleteReviewHandler}
                className='font-semibold px-3.5 py-2.5 text-yellow-300 rounded-md shadow-md hover:bg-yellow-300 hover:opacity-90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'
              >
                Delete Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewScreen;
