import React from 'react';

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
  },
}) => {
  return (
    <div className='grid grid-cols-3 gap-2 px-4 shadow-md py-7 rounded-2xl'>
      <div className='col-span-2'>{name}</div>
      <div>{avgRating}</div>

      <div className='col-span-3'>{`${city}, ${state}, ${country}`}</div>
      <div className='col-span-3 font-bold'>title</div>

      <div className='col-span-3'>{reviews.length}</div>
    </div>
  );
};

export default College;
