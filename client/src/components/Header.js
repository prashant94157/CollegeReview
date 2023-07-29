import React from 'react';

function Header() {
  return (
    <div class='h-24 flex items-end font-sans text-2xl font-bold'>
      <div class='flex justify-between w-full flex-wrap'>
        <div class='w-1\/4 pl-10'>
          <a
            className='hover:border-b-2 hover:text-[#fff000] hover:border-b-[#fff000]'
            href='/'
          >
            Home
          </a>
        </div>
        <div class='flex justify-between gap-10 w-3\/4 m-auto sm:m-0'>
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
          <div class='sm:pr-10'>
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
