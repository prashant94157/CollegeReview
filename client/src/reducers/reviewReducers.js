import {
  REVIEW_DETAILS_FAIL,
  REVIEW_DETAILS_REQUEST,
  REVIEW_DETAILS_RESET,
  REVIEW_DETAILS_SUCCESS,
} from '../constants/reviewConstants';

const userReviewsReducer = (
  state = { reviews: [], success: false },
  { type, payload }
) => {
  switch (type) {
    case REVIEW_DETAILS_FAIL:
      return { ...state, success: true, error: payload, loading: false };

    case REVIEW_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REVIEW_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        page: payload.page,
        pages: payload.pages,
        reviews: payload.reviews,
        success: true,
      };

    case REVIEW_DETAILS_RESET:
      return { reviews: [], success: false };

    default:
      return state;
  }
};

export { userReviewsReducer };
