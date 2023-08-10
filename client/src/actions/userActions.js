import axios from 'axios';

import {
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';
import { GET_USER_REVIEWS_RESET } from '../constants/reviewConstants';

const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    console.log(email, password);

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
      console.log(email, password, name);

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

    dispatch({
      type: USER_LOGOUT,
    });

    dispatch({
      type: GET_USER_REVIEWS_RESET,
    });
  } catch (error) {}
};

const getUserProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
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
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const updateProfile =
  ({ userId, email, password, name }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFILE_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      console.log(userId, email, password, name);

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
      console.log(data);

      if (userInfo._id === data._id) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });
      }

      dispatch({
        type: PROFILE_UPDATE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PROFILE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export { login, register, logout, getUserProfile, updateProfile };
