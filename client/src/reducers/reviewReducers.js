import {
  GET_USER_REVIEWS_FAIL,
  GET_USER_REVIEWS_REQUEST,
  GET_USER_REVIEWS_SUCCESS,
} from '../constants/reviewConstants';

const userReviewsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_USER_REVIEWS_FAIL:
      return {};

    case GET_USER_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_USER_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        reviews: payload,
      };

    default:
      return state;
  }
};

export { userReviewsReducer };
