import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Alert from '../../components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../actions/reviewActions';
import {
  REVIEW_CREATE_RESET,
  REVIEW_LIST_RESET,
} from '../../constants/reviewConstants';
import Spinner from '../../components/Spinner';

const ReviewCreateScreen = () => {
  const [formData, setFormData] = useState({
    title: '',
    rating: '',
    description: '',
    degree: '',
  });
  const { title, rating, description, degree } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { id: collegeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reviewCreate = useSelector((state) => state.reviewCreate);
  const { loading, error, success, reviewId } = reviewCreate;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createReview({ collegeId, title, rating, description, degree }));
  };

  useEffect(() => {
    if (success) {
      dispatch({
        type: REVIEW_CREATE_RESET,
      });
      dispatch({
        type: REVIEW_LIST_RESET,
      });

      localStorage.removeItem('userReviews');

      navigate(`/colleges/${collegeId}/reviews/${reviewId}`);
    }
  }, [collegeId, dispatch, navigate, reviewId, success]);

  return loading ? (
    <Spinner />
  ) : (
    <div className='min-h-[50vh]'>
      <div className='flex flex-col justify-center flex-1 px-6 min-h-[95vh] lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='text-3xl font-bold leading-9 tracking-tight text-center'>
            Create Review
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={onSubmit} method='POST'>
            <div>
              <label
                htmlFor='title'
                className='block text-sm font-medium leading-6'
              >
                Title
              </label>
              <div className='mt-2'>
                <input
                  id='title'
                  name='title'
                  type='text'
                  value={title}
                  onChange={onChange}
                  autoComplete='title'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='rating'
                className='block text-sm font-medium leading-6'
              >
                Rating
              </label>
              <div className='mt-2'>
                <input
                  id='rating'
                  name='rating'
                  type='number'
                  value={rating}
                  onChange={onChange}
                  autoComplete='rating'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div class='col-span-full'>
              <label
                htmlFor='description'
                className='block text-sm font-medium leading-6'
              >
                Description
              </label>
              <div class='mt-2'>
                <textarea
                  rows='3'
                  id='description'
                  name='description'
                  type='textarea'
                  value={description}
                  onChange={onChange}
                  autoComplete='description'
                  required
                  class='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                ></textarea>
              </div>
            </div>

            <div>
              <label
                htmlFor='degree'
                className='block text-sm font-medium leading-6'
              >
                Degree
              </label>
              <div className='mt-2'>
                <input
                  id='degree'
                  name='degree'
                  type='text'
                  value={degree}
                  onChange={onChange}
                  autoComplete='degree'
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

export default ReviewCreateScreen;
