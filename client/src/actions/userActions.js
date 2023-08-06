import axios from 'axios';

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
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

export { login, register, logout };
