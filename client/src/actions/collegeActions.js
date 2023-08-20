import axios from 'axios';

import {
  COLLEGE_CREATE_FAIL,
  COLLEGE_CREATE_REQUEST,
  COLLEGE_CREATE_SUCCESS,
  COLLEGE_DELETE_FAIL,
  COLLEGE_DELETE_REQUEST,
  COLLEGE_DELETE_SUCCESS,
  COLLEGE_DETAILS_FAIL,
  COLLEGE_DETAILS_REQUEST,
  COLLEGE_DETAILS_SUCCESS,
  COLLEGE_LIST_FAIL,
  COLLEGE_LIST_REQUEST,
  COLLEGE_LIST_RESET,
  COLLEGE_LIST_SUCCESS,
  COLLEGE_UPDATE_FAIL,
  COLLEGE_UPDATE_REQUEST,
  COLLEGE_UPDATE_SUCCESS,
} from '../constants/collegeConstant';

const createCollege =
  ({ name, state, country, city, pinCode, about }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: COLLEGE_CREATE_REQUEST,
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
        `/api/v1/colleges`,
        { name, state, country, city, pinCode, about },
        config
      );

      dispatch({
        type: COLLEGE_CREATE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: COLLEGE_LIST_RESET,
      });
    } catch (error) {
      dispatch({
        type: COLLEGE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

const getCollegeList = (keyword, pageNumber) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COLLEGE_LIST_REQUEST,
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
      `/api/v1/colleges?keyword=${keyword}&pageNumber=${pageNumber}`,
      config
    );

    dispatch({
      type: COLLEGE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COLLEGE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const getCollegeById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COLLEGE_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/colleges/${id}`, config);

    dispatch({ type: COLLEGE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COLLEGE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const updateCollege =
  ({ collegeId, name, city, state, country, pinCode, about }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: COLLEGE_UPDATE_REQUEST,
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
        `/api/v1/colleges/${collegeId}`,
        { name, city, state, country, pinCode, about },
        config
      );

      dispatch({
        type: COLLEGE_UPDATE_SUCCESS,
      });

      dispatch({
        type: COLLEGE_LIST_RESET,
      });
    } catch (error) {
      dispatch({
        type: COLLEGE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

const deleteCollege = (collegeId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COLLEGE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/v1/colleges/${collegeId}`, config);

    dispatch({
      type: COLLEGE_DELETE_SUCCESS,
    });

    dispatch({
      type: COLLEGE_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: COLLEGE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export {
  createCollege,
  getCollegeList,
  getCollegeById,
  updateCollege,
  deleteCollege,
};
