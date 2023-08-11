import {
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_RESET,
  REVIEW_CREATE_SUCCESS,
  REVIEW_DELETE_FAIL,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_RESET,
  REVIEW_DELETE_SUCCESS,
  REVIEW_DETAILS_FAIL,
  REVIEW_DETAILS_REQUEST,
  REVIEW_DETAILS_RESET,
  REVIEW_DETAILS_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_RESET,
  REVIEW_LIST_SUCCESS,
  REVIEW_UPDATE_FAIL,
  REVIEW_UPDATE_REQUEST,
  REVIEW_UPDATE_SUCCESS,
} from '../constants/reviewConstants';

const userReviewsReducer = (
  state = { reviews: [], success: false },
  { type, payload }
) => {
  switch (type) {
    case REVIEW_LIST_FAIL:
      return { ...state, success: true, error: payload, loading: false };

    case REVIEW_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REVIEW_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        page: payload.page,
        pages: payload.pages,
        reviews: payload.reviews,
        success: true,
      };

    case REVIEW_LIST_RESET:
      return { reviews: [], success: false };

    default:
      return state;
  }
};

const reviewUpdateReducer = (state = { success: false }, { type, payload }) => {
  switch (type) {
    case REVIEW_UPDATE_REQUEST:
      return { ...state, loading: true };

    case REVIEW_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true };

    case REVIEW_UPDATE_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

const reviewDeleteReducer = (state = { success: false }, { type, payload }) => {
  switch (type) {
    case REVIEW_DELETE_REQUEST:
      return { ...state, loading: true };

    case REVIEW_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };

    case REVIEW_DELETE_FAIL:
      return { ...state, loading: false, error: payload };

    case REVIEW_DELETE_RESET:
      return { success: false };

    default:
      return state;
  }
};

const reviewCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case REVIEW_CREATE_REQUEST:
      return { loading: true };

    case REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, reviewId: payload._id };

    case REVIEW_CREATE_FAIL:
      return { loading: false, error: payload };

    case REVIEW_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

const reviewDetailsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case REVIEW_DETAILS_REQUEST:
      return { loading: true };

    case REVIEW_DETAILS_FAIL:
      return { loading: false, error: payload };

    case REVIEW_DETAILS_RESET:
      return {};

    case REVIEW_DETAILS_SUCCESS:
      return { loading: false, review: payload };

    default:
      return state;
  }
};

export {
  userReviewsReducer,
  reviewUpdateReducer,
  reviewDeleteReducer,
  reviewCreateReducer,
  reviewDetailsReducer,
};
