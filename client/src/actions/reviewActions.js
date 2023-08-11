import axios from 'axios';
import {
  REVIEWS_DETAILS_FAIL,
  REVIEWS_DETAILS_REQUEST,
  REVIEWS_DETAILS_SUCCESS,
} from '../constants/reviewConstants';

const getUserReviews = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEWS_DETAILS_REQUEST,
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
      type: REVIEWS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEWS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { getUserReviews };
