import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getPlanById } from '../../actions/planActions';
import Spinner from '../../components/Spinner';
import Alert from '../../components/Alert';

const PlanScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const planDetails = useSelector((state) => state.planDetails);
  const { plan, error, loading } = planDetails;
  const { id } = useParams();
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getPlanById(id));
  }, [dispatch, id]);

  const deletePlan = () => {};

  return (
    <div>
      <Link to='/plans'>Back</Link>
      {loading === undefined || loading ? (
        <Spinner />
      ) : error ? (
        <Alert>{error}</Alert>
      ) : (
        <>
          <div className='py-10 text-6xl font-bold text-center text-yellow-500'>
            Plan
          </div>

          {userInfo.userType === 'admin' && (
            <div className='flex flex-col items-center justify-center'>
              <div className='flex items-center justify-around w-1/2 text-2xl sm:w-1/3 sm:text-3xl'>
                <Link
                  to={`/plans/${id}/edit`}
                  className='font-semibold px-3.5 py-2.5 text-yellow-300 rounded-md shadow-md hover:bg-yellow-300 hover:opacity-90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'
                >
                  Edit
                </Link>
                <Link
                  onClick={deletePlan}
                  className='font-semibold px-3.5 py-2.5 text-yellow-300 rounded-md shadow-md hover:bg-yellow-300 hover:opacity-90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'
                >
                  Delete
                </Link>
                <Link
                  onClick={deletePlan}
                  className='font-semibold px-3.5 py-2.5 text-yellow-300 rounded-md shadow-md hover:bg-yellow-300 hover:opacity-90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'
                >
                  Buy
                </Link>
              </div>
            </div>
          )}

          <div className='px-20 lg:px-40'>
            <div className='border-gray-100'>
              <dl className='divide-y divide-gray-100'>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6'>Price</dt>
                  <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                    {plan.price}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 '>Days</dt>
                  <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                    {plan.days}
                  </dd>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6 '>Plan Type</dt>
                  <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                    {plan.planType}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlanScreen;
