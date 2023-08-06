import axios from 'axios';
import {
  GET_USER_REVIEWS_FAIL,
  GET_USER_REVIEWS_REQUEST,
  GET_USER_REVIEWS_SUCCESS,
} from '../constants/reviewConstants';

const getUserReviews = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_REVIEWS_REQUEST,
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
      type: GET_USER_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_REVIEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { getUserReviews };
