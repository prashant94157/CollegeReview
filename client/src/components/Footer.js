import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  return !userInfo ? (
    ''
  ) : (
    <div className='h-2/5 bg-[rgba(24,24,36,.75)] flex items-center'>
      <div className='w-2/3 p-24'>
        <div className='pb-6 text-4xl font-bold text-center'>
          College Review
        </div>
        <div className='p-10 pb-0'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
          consequatur cupiditate. Unde sed nihil quae, sint quibusdam libero
          odio sequi dolor? Iusto nam voluptatum obcaecati aliquam earum? Dicta,
          commodi qui.
        </div>
      </div>
      <div className='flex flex-col items-center justify-center w-1/3 text-2xl font-bold'>
        <div className='pt-4'>
          <a href='/'>home</a>
        </div>
        <div className='pt-4'>
          <a href='/'>about</a>
        </div>
        <div className='pt-4'>
          <a href='/'>contact</a>
        </div>
        <div className='pt-4'>
          <a href='/'>experience</a>
        </div>
        <div className='pt-4 pb-4'>
          <a href='/'>education</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
