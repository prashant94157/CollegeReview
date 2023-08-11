import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Plan from '../../components/Plan';
import { getPlansList } from '../../actions/planActions';
import Alert from '../../components/Alert';
import Spinner from '../../components/Spinner';

const PlanListScreen = () => {
  const dispatch = useDispatch();
  const plansList = useSelector((state) => state.planList);
  const { error, loading, success, page, pages, plans } = plansList;

  useEffect(() => {
    if (!success) dispatch(getPlansList());

    // return () => {
    //   second;
    // };
  }, [success, dispatch]);

  return (
    <div>
      <div className='py-10 text-6xl font-bold text-center text-yellow-500'>
        Plans
      </div>

      {error && <Alert>{error}</Alert>}
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
