import React from 'react';

function Register() {
  return (
    <div className='flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='text-2xl font-bold leading-9 tracking-tight text-center'>
          Create your account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' action='#' method='POST'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6'
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6'
              >
                Password
              </label>
              {/* <div className='text-sm'>
                      <a href='/' className='font-semibold'>
                        Forgot password?
                      </a>
                    </div> */}
            </div>
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6'
              >
                Confirm Password
              </label>
              {/* <div className='text-sm'>
                      <a href='/' className='font-semibold'>
                        Forgot password?
                      </a>
                    </div> */}
            </div>
            <div className='mt-2'>
              <input
                id='password'
                name='confirmPassword'
                type='password'
                autoComplete='current-password'
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
              Register
            </button>
          </div>
        </form>

        <p className='mt-10 text-sm text-center'>
          Already have an account?
          <a
            href='/'
            className='font-semibold pl-2 hover:text-[#fff000] px-3 leading-6'
          >
            LOGIN
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
