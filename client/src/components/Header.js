import React from 'react';

function Header() {
  return (
    <div className='flex items-end h-24 font-sans text-2xl font-bold'>
      <div className='flex flex-wrap justify-between w-full'>
        <div className='w-1\/4 pl-10'>
          <a
            className='hover:border-b-2 hover:text-[#fff000] hover:border-b-[#fff000]'
            href='/'
          >
            Home
          </a>
        </div>
        <div className='flex justify-between gap-10 w-3\/4 m-auto sm:m-0'>
          <div>
            <a
              className='hover:border-b-2 hover:text-[#fff000] hover:border-b-[#fff000]'
              href='/experience.html'
            >
              Experience
            </a>
          </div>
          <div>
            <a
              className='hover:border-b-2 hover:text-[#fff000] hover:border-b-[#fff000]'
              href='/education.html'
            >
              Education
            </a>
          </div>
          <div>
            <a
              className='hover:border-b-2 hover:text-[#fff000] hover:border-b-[#fff000]'
              href='/projects.html'
            >
              Projects
            </a>
          </div>
          <div className='sm:pr-10'>
            <a
              className='hover:border-b-2 hover:text-[#fff000] hover:border-b-[#fff000]'
              href='/projects.html'
            >
              About
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
