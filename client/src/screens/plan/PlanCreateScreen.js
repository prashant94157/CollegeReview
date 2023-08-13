import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from '../../components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { PLAN_CREATE_RESET } from '../../constants/planConstant';
import { createPlan } from '../../actions/planActions';
import Spinner from '../../components/Spinner';

const PlanCreateScreen = () => {
  const [formData, setFormData] = useState({
    price: '',
    days: '',
    planType: 'free',
  });
  const { price, days, planType } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const planCreate = useSelector((state) => state.planCreate);
  const { loading, success, planId, error } = planCreate;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      dispatch({
        type: PLAN_CREATE_RESET,
      });

      navigate(`/plans/${planId}`);
    }
  }, [dispatch, navigate, planId, success]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPlan({ price, days, planType }));
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className='min-h-[50vh]'>
      {error && <Alert>{error}</Alert>}
      <div className='flex flex-col justify-center flex-1 px-6 min-h-[95vh] lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='text-3xl font-bold leading-9 tracking-tight text-center'>
            Create Plan
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={onSubmit} method='POST'>
            <div>
              <label
                htmlFor='price'
                className='block text-sm font-medium leading-6'
              >
                Price
              </label>
              <div className='mt-2'>
                <input
                  id='price'
                  name='price'
                  type='number'
                  value={price}
                  onChange={onChange}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='days'
                className='block text-sm font-medium leading-6'
              >
                Days
              </label>
              <div className='mt-2'>
                <input
                  id='days'
                  name='days'
                  type='number'
                  value={days}
                  onChange={onChange}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div class=''>
              <label for='planType' class='block text-sm font-medium leading-6'>
                Plan Type
              </label>
              <div class='mt-2'>
                <select
                  id='planType'
                  value={planType}
                  onChange={onChange}
                  class='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                >
                  <option value='free'>Free</option>
                  <option value='not-free'>Not-Free</option>
                </select>
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

export default PlanCreateScreen;
