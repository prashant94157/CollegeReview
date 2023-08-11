import React from 'react';
import User from '../../components/User';

const UserListScreen = () => {
  return (
    <div>
      <div className='py-10 text-6xl font-bold text-center text-yellow-500'>
        Users
      </div>

      <div className='px-10 pb-10 lg:px-40'>
        <div className='grid gap-4 px-10 py-5 pt-3 lg:grid-cols-2 '>
          <User />
          <User />
        </div>
      </div>
    </div>
  );
};

export default UserListScreen;
