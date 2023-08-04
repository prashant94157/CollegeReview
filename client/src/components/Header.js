import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const onClick = () => {};

  return (
    <div className='flex items-center justify-around h-24 font-sans text-2xl font-extrabold shadow-md'>
      <div>
        <Link
          className='hover:border-b-2 hover:text-[#fff000] hover:border-b-[#fff000]'
          to='/dashboard'
        >
          Home
        </Link>
      </div>
      <div className='flex space-x-10'>
        <div>
          <Link
            className='hover:border-b-2 hover:text-[#fff000] hover:border-b-[#fff000]'
            to='/plans'
          >
            Plans
          </Link>
        </div>
        <div>
          <Link
            className='hover:border-b-2 hover:text-[#fff000] hover:border-b-[#fff000]'
            to='/colleges'
          >
            Colleges
          </Link>
        </div>
        <div>
          <button
            className='hover:border-b-2 hover:text-[#fff000] hover:border-b-[#fff000]'
            onClick={onClick}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
