import React from 'react';

const Plan = ({ data: { price, days, planType } }) => {
  return (
    <div className='grid grid-cols-3 gap-2 px-4 shadow-md py-7 rounded-2xl'>
      <div className='col-span-1'>Plan</div>

      <div className='col-span-2'>{price}</div>
      <div>{days}</div>
      <div>{planType}</div>
      <div className='col-span-3 font-bold'>Buy</div>
    </div>
  );
};

export default Plan;
