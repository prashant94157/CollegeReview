import axios from 'axios';

import {
  COLLEGE_CREATE_FAIL,
  COLLEGE_CREATE_REQUEST,
  COLLEGE_CREATE_SUCCESS,
  COLLEGE_DETAILS_REQUEST,
  COLLEGE_DETAILS_SUCCESS,
  COLLEGE_LIST_FAIL,
  COLLEGE_LIST_REQUEST,
  COLLEGE_LIST_RESET,
  COLLEGE_LIST_SUCCESS,
} from '../constants/collegeConstant';

const createCollege =
  ({ name, city, state, country }) =>
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
        { name, city, state, country },
        config
      );

      console.log(data);

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

const getCollegeList = (keyword, pagenumber) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COLLEGE_LIST_REQUEST,
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
      `/api/v1/colleges?keyword=${keyword}&pagenumber=${pagenumber}`,
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

const getCollegeByID = (id) => async (dispatch, getState) => {
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
      type: COLLEGE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { createCollege, getCollegeList, getCollegeByID };
