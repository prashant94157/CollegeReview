import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Alert from '../components/Alert';

const CollegeCreateEditScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    country: '',
  });
  const { name, city, state, country } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='min-h-[50vh]'>
      <div className='flex flex-col justify-center flex-1 px-6 min-h-[95vh] lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='text-3xl font-bold leading-9 tracking-tight text-center'>
            Create College
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={onSubmit} method='POST'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium leading-6'
              >
                College Name
              </label>
              <div className='mt-2'>
                <input
                  id='name'
                  name='name'
                  type='text'
                  value={name}
                  onChange={onChange}
                  autoComplete='name'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='city'
                className='block text-sm font-medium leading-6'
              >
                City
              </label>
              <div className='mt-2'>
                <input
                  id='city'
                  name='city'
                  type='text'
                  value={city}
                  onChange={onChange}
                  autoComplete='city'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='state'
                className='block text-sm font-medium leading-6'
              >
                State
              </label>
              <div className='mt-2'>
                <input
                  id='state'
                  name='state'
                  type='text'
                  value={state}
                  onChange={onChange}
                  autoComplete='state'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='country'
                className='block text-sm font-medium leading-6'
              >
                Country
              </label>
              <div className='mt-2'>
                <input
                  id='country'
                  name='country'
                  type='text'
                  value={country}
                  onChange={onChange}
                  autoComplete='country'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-[#fff000] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CollegeCreateEditScreen;
