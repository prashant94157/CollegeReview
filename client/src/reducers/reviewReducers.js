import {
  GET_USER_REVIEWS_FAIL,
  GET_USER_REVIEWS_REQUEST,
  GET_USER_REVIEWS_RESET,
  GET_USER_REVIEWS_SUCCESS,
} from '../constants/reviewConstants';

const userReviewsReducer = (
  state = { reviews: [], success: false },
  { type, payload }
) => {
  switch (type) {
    case GET_USER_REVIEWS_FAIL:
      return { ...state, success: true, error: payload, loading: false };

    case GET_USER_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_USER_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        page: payload.page,
        pages: payload.pages,
        reviews: payload.reviews,
        success: true,
      };

    case GET_USER_REVIEWS_RESET:
      return { reviews: [], success: false };

    default:
      return state;
  }
};

export { userReviewsReducer };
