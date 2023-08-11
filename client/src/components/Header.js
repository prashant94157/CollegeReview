import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../actions/userActions';

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(logout());
  };

  return !userInfo ? (
    ''
  ) : (
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
        <div className=''>
          <button className='hover:animate-pulse' onClick={onClick}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
