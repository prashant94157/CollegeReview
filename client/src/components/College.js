import React from 'react';
import { Link } from 'react-router-dom';

const College = ({
  data: {
    name,
    city,
    state,
    country,
    avgRating,
    approvedReviews: reviews,
    totalReviews,
    availableCourses,
    _id,
  },
}) => {
  return (
    <div className='grid grid-cols-3 gap-2 px-4 shadow-md py-7 rounded-2xl'>
      <div className='col-span-2'>{name}</div>
      <div>{avgRating}</div>

      <div className='col-span-2'>{`${city}, ${state}, ${country}`}</div>
      <div>
        <Link to={`/colleges/${_id}`}>View</Link>
      </div>
      <div className='col-span-2 font-bold'>title</div>
      <div>
        <Link to={`/colleges/${_id}/edit`}>Edit</Link>
      </div>

      <div className='col-span-2'>{reviews.length}</div>
      <div>
        <Link to={`/colleges/${_id}/reviews/create`}>Review</Link>
      </div>
    </div>
  );
};

export default College;
