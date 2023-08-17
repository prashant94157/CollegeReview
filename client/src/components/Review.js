import React from 'react';
import { Link } from 'react-router-dom';

const Review = ({
  review: {
    _id,
    college,
    title,
    rating,
    description,
    degree,
    isApproved,
    createdBy: { name: userName },
  },
  showCollege,
}) => {
  const deleteReview = () => {};
  return (
    <div className='grid grid-cols-3 gap-2 px-4 shadow-md py-7 rounded-2xl'>
      <div className='col-span-2'>{showCollege ? college.name : userName}</div>

      <div>&#9733;</div>

      <div className='col-span-2'>{degree}</div>
      <div>Date</div>
      <div className='col-span-3 font-bold'>{title}</div>

      <div>
        <Link
          to={`/colleges/${college._id ? college._id : college}/reviews/${_id}`}
        >
          Show
        </Link>
      </div>
      <div>
        <Link
          to={`/colleges/${
            college._id ? college._id : college
          }/reviews/${_id}/edit`}
        >
          Edit
        </Link>
      </div>
      <div>
        <button onClick={deleteReview}>Delete</button>
      </div>

      <div className='h-[70px] col-span-3 line-clamp-3'>{description}</div>
    </div>
  );
};

export default Review;
