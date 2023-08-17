import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Plan from '../../components/Plan';
import { getPlanList } from '../../actions/planActions';
import Alert from '../../components/Alert';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';

const PlanListScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const plansList = useSelector((state) => state.planList);

  const { userInfo } = userLogin;
  const { error, loading, success, page, pages, plans } = plansList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlanList());
  }, [success, dispatch]);

  return (
    <div>
      <div className='py-10 text-6xl font-bold text-center text-yellow-500'>
        Plans
      </div>
      {error && <Alert>{error}</Alert>}

      {userInfo.userType === 'admin' && (
        <div className='flex justify-around mb-6 text-2xl'>
          <Link
            to={`/plans/create`}
            className='font-semibold px-3.5 py-2.5 text-yellow-300 rounded-md shadow-md hover:bg-yellow-300 hover:opacity-90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'
          >
            Create
          </Link>
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : (
        <>
          {plans.length ? (
            <div className='px-10 pb-10 lg:px-40'>
              <div className='grid gap-4 px-10 py-5 pt-3 lg:grid-cols-2 '>
                {plans.map((plan) => (
                  <Plan data={plan} />
                ))}
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-center w-full h-40 text-lg '>
              <div>We have no plans for you as of now!!!</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlanListScreen;
