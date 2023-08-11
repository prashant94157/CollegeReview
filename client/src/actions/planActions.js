import axios from 'axios';

import {
  PLAN_LIST_FAIL,
  PLAN_LIST_REQUEST,
  PLAN_LIST_SUCCESS,
} from '../constants/planConstant';

const getPlansList = () => async (dispatch) => {
  try {
    dispatch({
      type: PLAN_LIST_REQUEST,
    });

    const { data } = await axios.get('/api/v1/plans');

    const time = new Date();
    localStorage.setItem(
      'plans',
      JSON.stringify({
        ...data,
        expiry: time.getTime() + 24 * 60 * 60 * 1000,
        success: true,
      })
    );

    dispatch({
      type: PLAN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLAN_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { getPlansList };
