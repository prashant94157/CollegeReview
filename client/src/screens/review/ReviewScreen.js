import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getReviewById } from '../../actions/reviewActions';
import Spinner from '../../components/Spinner';
import Alert from '../../components/Alert';

const ReviewScreen = () => {
  const dispatch = useDispatch();
  const reviewDetails = useSelector((state) => state.reviewDetails);
  const { review, error, loading } = reviewDetails;
  const { id: collegeId, reviewId } = useParams();

  useEffect(() => {
    dispatch(getReviewById(reviewId));
  }, []);

  return (
    <div>
      <Link to={`/colleges/${collegeId}`}>Back</Link>
      {loading === undefined || loading ? (
        <Spinner />
      ) : error ? (
        <Alert>{error}</Alert>
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
        </div>
      )}
    </div>
  );
};

export default ReviewScreen;
