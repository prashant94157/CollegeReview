import React from 'react';

const Review = ({
  review: { college, title, rating, description, degree },
}) => {
  return (
    <div className='grid grid-cols-3 gap-2 px-4 shadow-md py-7 rounded-2xl'>
      <div className='col-span-2'>{college.name}</div>
      <div>&#9733;&#9733;&#9733;&#9733;&#9733;</div>

      <div className='col-span-2'>{degree}</div>
      <div>Date</div>
      <div className='col-span-3 font-bold'>{title}</div>

      <div className='col-span-3 line-clamp-3'>{description}</div>
    </div>
  );
};

export default Review;
