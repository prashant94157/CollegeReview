import axios from 'axios';

import {
  PLAN_CREATE_FAIL,
  PLAN_CREATE_REQUEST,
  PLAN_CREATE_SUCCESS,
  PLAN_DELETE_FAIL,
  PLAN_DELETE_REQUEST,
  PLAN_DELETE_SUCCESS,
  PLAN_DETAILS_FAIL,
  PLAN_DETAILS_REQUEST,
  PLAN_DETAILS_SUCCESS,
  PLAN_LIST_FAIL,
  PLAN_LIST_REQUEST,
  PLAN_LIST_RESET,
  PLAN_LIST_SUCCESS,
  PLAN_UPDATE_FAIL,
  PLAN_UPDATE_REQUEST,
  PLAN_UPDATE_SUCCESS,
} from '../constants/planConstant';

const getPlanList = () => async (dispatch) => {
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

const createPlan =
  ({ price, days, planType }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PLAN_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/v1/plans`,
        { price, days, planType },
        config
      );

      dispatch({
        type: PLAN_CREATE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: PLAN_LIST_RESET,
      });
    } catch (error) {
      dispatch({
        type: PLAN_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

const getPlanById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLAN_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/plans/${id}`, config);

    dispatch({ type: PLAN_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PLAN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const updatePlan =
  ({ planId, price, days, planType }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PLAN_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };

      await axios.put(
        `/api/v1/colleges/${planId}`,
        { price, days, planType },
        config
      );

      dispatch({
        type: PLAN_UPDATE_SUCCESS,
      });

      dispatch({
        type: PLAN_LIST_RESET,
      });
    } catch (error) {
      dispatch({
        type: PLAN_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

const deletePlan = (planId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLAN_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/v1/plans/${planId}`, config);

    dispatch({
      type: PLAN_DELETE_SUCCESS,
    });

    dispatch({
      type: PLAN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: PLAN_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { getPlanList, createPlan, getPlanById, updatePlan, deletePlan };
