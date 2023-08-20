import axios from 'axios';

import {
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_FAIL,
  USER_DELETE_SUCCESS,
  USER_DELETE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_RESET,
  USER_DETAILS_RESET,
  USER_UPDATE_RESET,
} from '../constants/userConstants';
import {
  REVIEW_CREATE_RESET,
  REVIEW_DELETE_RESET,
  REVIEW_DETAILS_RESET,
  REVIEW_LIST_RESET,
  REVIEW_UPDATE_RESET,
} from '../constants/reviewConstants';
import {
  COLLEGE_CREATE_RESET,
  COLLEGE_DELETE_RESET,
  COLLEGE_DETAILS_RESET,
  COLLEGE_LIST_RESET,
  COLLEGE_UPDATE_RESET,
} from '../constants/collegeConstant';
import {
  PLAN_CREATE_RESET,
  PLAN_DELETE_RESET,
  PLAN_DETAILS_RESET,
  PLAN_LIST_RESET,
  PLAN_UPDATE_RESET,
} from '../constants/planConstant';

const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/v1/users/login',
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/v1/users/register',
        { email, password, name },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userReviews');
    localStorage.removeItem('plans');

    dispatch({
      type: USER_LOGOUT,
    });

    dispatch({
      type: COLLEGE_UPDATE_RESET,
    });

    dispatch({
      type: COLLEGE_DELETE_RESET,
    });

    dispatch({
      type: COLLEGE_DETAILS_RESET,
    });

    dispatch({
      type: COLLEGE_LIST_RESET,
    });

    dispatch({
      type: COLLEGE_CREATE_RESET,
    });

    dispatch({
      type: PLAN_UPDATE_RESET,
    });

    dispatch({
      type: PLAN_DELETE_RESET,
    });

    dispatch({
      type: PLAN_DETAILS_RESET,
    });

    dispatch({
      type: PLAN_LIST_RESET,
    });

    dispatch({
      type: PLAN_CREATE_RESET,
    });

    dispatch({
      type: REVIEW_UPDATE_RESET,
    });

    dispatch({
      type: REVIEW_DELETE_RESET,
    });

    dispatch({
      type: REVIEW_DETAILS_RESET,
    });

    dispatch({
      type: REVIEW_LIST_RESET,
    });

    dispatch({
      type: REVIEW_CREATE_RESET,
    });

    dispatch({
      type: USER_UPDATE_RESET,
    });

    dispatch({
      type: USER_DELETE_RESET,
    });

    dispatch({
      type: USER_DETAILS_RESET,
    });

    dispatch({
      type: USER_LIST_RESET,
    });
  } catch (error) {}
};

const getUserById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const updateUser =
  ({ userId, email, password, name }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
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

      const { data } = await axios.put(
        `/api/v1/users/${userId}`,
        { email, password, name },
        config
      );

      if (userInfo._id === data._id) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });
      }

      dispatch({
        type: USER_UPDATE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/v1/users/${userId}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });

    dispatch(logout());
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const getUserList = (keyword, pageNumber) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
      payload: { keyword: keyword },
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/v1/users?keyword=${keyword}&pageNumber=${pageNumber}`,
      config
    );

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export {
  login,
  register,
  logout,
  getUserById,
  updateUser,
  deleteUser,
  getUserList,
};
