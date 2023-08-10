import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getUserProfile, updateProfile } from '../actions/userActions';
import { USER_PROFILE_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const userProfile = useSelector((state) => state.userProfile);
  const profileUpdate = useSelector((state) => state.profileUpdate);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const { userInfo } = userLogin;
  const { profile, loading, error } = userProfile;
  const { success, loading: loadingUpdate, error: errorUpdate } = profileUpdate;
  const { email, password, name, confirmPassword } = formData;
  const { id: userId } = useParams();

  useEffect(() => {
    console.log('useEffect re rendered');
    if (success) {
      dispatch({ type: USER_PROFILE_RESET });
      navigate('/dashboard');
    } else if (userInfo._id === userId) {
      setFormData({ ...formData, name: userInfo.name, email: userInfo.email });
    } else if (profile) {
      setFormData({ ...formData, name: profile.name, email: profile.email });
    } else {
      dispatch(getUserProfile(userId));
    }
  }, [dispatch, profile, userId, userInfo, navigate, success]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords are not same');
    } else {
      dispatch(updateProfile({ userId, email, name, password }));
    }
  };

  return (
    <div className='min-h-[50vh]'>
      {loading || loadingUpdate ? (
        <Spinner />
      ) : (
        <>
          {error && <Alert>{error}</Alert>}
          {message && <Alert>{message}</Alert>}
          {errorUpdate && <Alert>{errorUpdate}</Alert>}
          <div className='flex flex-col justify-center flex-1 px-6 min-h-[95vh] lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
              <h2 className='text-3xl font-bold leading-9 tracking-tight text-center'>
                Update profile
              </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
              <form className='space-y-6' onSubmit={onSubmit} method='POST'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium leading-6'
                  >
                    Name
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
                      value={email}
                      onChange={onChange}
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
                  </div>
                  <div className='mt-2'>
                    <input
                      id='confirmPassword'
                      name='confirmPassword'
                      type='password'
                      autoComplete='current-password'
                      value={confirmPassword}
                      onChange={onChange}
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
                  </div>
                  <div className='mt-2'>
                    <input
                      id='password'
                      name='password'
                      type='password'
                      autoComplete='current-password'
                      value={password}
                      onChange={onChange}
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>

                <div>
                  <button
                    type='submit'
                    className='flex w-full justify-center rounded-md bg-[#fff000] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserEditScreen;
