import axios from 'axios';

import {
  REVIEW_DETAILS_FAIL,
  REVIEW_DETAILS_REQUEST,
  REVIEW_DETAILS_SUCCESS,
} from '../constants/reviewConstants';

const getUserReviews = () => async (dispatch, getState) => {
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

    const { data } = await axios.get('/api/v1/reviews', config);

    localStorage.setItem(
      'userReviews',
      JSON.stringify({
        ...data,
        success: true,
      })
    );

    dispatch({
      type: REVIEW_DETAILS_SUCCESS,
      payload: data,
    });
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

export { getUserReviews };
