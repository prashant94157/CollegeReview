import axios from 'axios';

import {
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_EDIT_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_FAIL,
  USER_DELETE_SUCCESS,
  USER_DELETE_RESET,
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

    dispatch({
      type: USER_DELETE_RESET,
    });
  } catch (error) {}
};

const getUserProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_EDIT_REQUEST,
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
      type: USER_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_EDIT_FAIL,
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
      console.log(data);

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
        'Content-Type': 'application/json',
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

export { login, register, logout, getUserProfile, updateUser, deleteUser };
