import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner';

const Homescreen = () => {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;
  useState(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [userInfo, navigate]);

  return loading ? (
    <Spinner />
  ) : (
    <div className='h-screen pt-24'>
      <div className='pt-20 text-6xl font-bold text-center'>College Review</div>
      <div className='flex flex-col items-center justify-center'>
        <div className='w-2/3 px-24 pt-20 pb-10'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          vel, assumenda at voluptatum pariatur enim nemo atque praesentium
          provident. Atque eligendi cum eius fugit porro minima dignissimos
          possimus ipsa maxime, voluptatum quasi odio eaque soluta?
          Reprehenderit alias, similique architecto, fugiat iure quo fuga
          obcaecati beatae ut laboriosam sequi, eius perspiciatis ea maxime
          inventore corporis ex quae ratione possimus. Neque cumque, maxime
          consequatur assumenda suscipit quisquam, veritatis non rem quis,
          repudiandae voluptate in delectus accusantium necessitatibus sed
          aspernatur omnis enim et recusandae explicabo accusamus mollitia
          libero quam ab. In, excepturi exercitationem! Nisi rem excepturi iste
          eaque consequuntur magnam est doloribus dolorem!
        </div>
        <div className='flex items-center justify-around w-1/3 text-3xl'>
          <Link
            to='/register'
            className='font-semibold px-3.5 py-2.5 text-yellow-300 rounded-md shadow-sm hover:bg-yellow-300 hover:opacity-90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'
          >
            Register
          </Link>
          <Link
            to='/login'
            className='font-semibold px-3.5 py-2.5 text-yellow-300 rounded-md shadow-sm hover:bg-yellow-300 hover:opacity-90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homescreen;
