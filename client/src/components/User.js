import React from 'react';
import formatDate from '../utils/formatDate';

const User = ({ data }) => {
  return (
    <div className='grid grid-cols-3 gap-2 px-4 shadow-md py-7 rounded-2xl'>
      <div className='col-span-2'>{data.name}</div>
      <div>{data.userType}</div>

      <div className='col-span-2'>{data.email}</div>
      <div className=''>{data.active ? 'active' : 'inactive'}</div>
      <div className='col-span-2'>{formatDate(data.subscribedTill)}</div>
      <div className=''>{formatDate(data.createdAt)}</div>

      <div className='h-[70px] col-span-3 line-clamp-3'>{data.about}</div>
    </div>
  );
};

export default User;
