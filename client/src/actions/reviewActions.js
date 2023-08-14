import axios from 'axios';

import {
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_DELETE_FAIL,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
  REVIEW_DETAILS_FAIL,
  REVIEW_DETAILS_REQUEST,
  REVIEW_DETAILS_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_RESET,
  REVIEW_LIST_SUCCESS,
  REVIEW_UPDATE_FAIL,
  REVIEW_UPDATE_REQUEST,
  REVIEW_UPDATE_SUCCESS,
} from '../constants/reviewConstants';

const getUserReviews = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEW_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/v1/reviews', config);

    localStorage.setItem(
      'userReviews',
      JSON.stringify({
        ...data,
        success: true,
      })
    );

    dispatch({
      type: REVIEW_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const createReview =
  ({ collegeId, title, rating, description, degree }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: REVIEW_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/v1/colleges/${collegeId}/reviews`,
        { title, rating, description, degree },
        config
      );

      console.log(data);

      dispatch({
        type: REVIEW_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REVIEW_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

const updateReview =
  ({ collegeId, reviewId, title, rating, description, degree }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: REVIEW_UPDATE_REQUEST,
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
        `/api/v1/colleges/${collegeId}/reviews/${reviewId}`,
        { title, rating, description, degree },
        config
      );

      dispatch({
        type: REVIEW_UPDATE_SUCCESS,
      });

      dispatch({
        type: REVIEW_LIST_RESET,
      });
    } catch (error) {
      dispatch({
        type: REVIEW_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

const deleteReview = (collegeId, reviewId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEW_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(
      `/api/v1/colleges/${collegeId}/reviews/${reviewId}`,
      config
    );

    dispatch({
      type: REVIEW_DELETE_SUCCESS,
    });

    dispatch({
      type: REVIEW_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const getReviewById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEW_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/reviews/${id}`, config);

    dispatch({ type: REVIEW_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REVIEW_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export {
  getUserReviews,
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
};
