import React from 'react';
import { Link } from 'react-router-dom';

const Plan = ({ data: { price, days, planType, _id } }) => {
  return (
    <div className='grid grid-cols-3 gap-2 px-4 shadow-md py-7 rounded-2xl'>
      <div className='col-span-1'>Plan</div>

      <div className='col-span-2'>{price}</div>
      <div>{days}</div>
      <div className='col-span-2'>{planType}</div>
      <div>
        <Link to={`/plans/${_id}`}>View</Link>
      </div>
      <div>
        <Link to={`/plans/${_id}/edit`}>Edit</Link>
      </div>
      <div>
        <Link to={`/colleges/${_id}`}>Buy</Link>
      </div>
    </div>
  );
};

export default Plan;
