import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundScreen = () => {
  return (
    <main className='grid h-screen min-h-full px-6 pt-20 pb-24 place-items-center sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-base font-semibold'>404</p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-5xl'>
          Page not found
        </h1>
        <p className='mt-6 text-base leading-7 '>
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className='flex items-center justify-center mt-10 gap-x-6'>
          <Link
            to='/'
            className='rounded-md  px-3.5 py-2.5 text-sm font-semibold text-yellow-300 shadow-sm hover:bg-yellow-300 hover:opacity-90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'
          >
            Go back home
          </Link>
          <Link className='rounded-md  px-3.5 py-2.5 text-sm font-semibold text-yellow-300 shadow-sm hover:bg-yellow-300 hover:opacity-90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'>
            Contact support <span aria-hidden='true'>&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundScreen;
