import {
  REVIEWS_DETAILS_FAIL,
  REVIEWS_DETAILS_REQUEST,
  REVIEWS_DETAILS_RESET,
  REVIEWS_DETAILS_SUCCESS,
} from '../constants/reviewConstants';

const userReviewsReducer = (
  state = { reviews: [], success: false },
  { type, payload }
) => {
  switch (type) {
    case REVIEWS_DETAILS_FAIL:
      return { ...state, success: true, error: payload, loading: false };

    case REVIEWS_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REVIEWS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        page: payload.page,
        pages: payload.pages,
        reviews: payload.reviews,
        success: true,
      };

    case REVIEWS_DETAILS_RESET:
      return { reviews: [], success: false };

    default:
      return state;
  }
};

export { userReviewsReducer };
