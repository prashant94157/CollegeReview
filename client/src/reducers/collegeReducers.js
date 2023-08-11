import {
  COLLEGE_CREATE_FAIL,
  COLLEGE_CREATE_REQUEST,
  COLLEGE_CREATE_RESET,
  COLLEGE_CREATE_SUCCESS,
  COLLEGE_DELETE_FAIL,
  COLLEGE_DELETE_REQUEST,
  COLLEGE_DELETE_RESET,
  COLLEGE_DELETE_SUCCESS,
  COLLEGE_DETAILS_FAIL,
  COLLEGE_DETAILS_REQUEST,
  COLLEGE_DETAILS_RESET,
  COLLEGE_DETAILS_SUCCESS,
  COLLEGE_LIST_FAIL,
  COLLEGE_LIST_REQUEST,
  COLLEGE_LIST_RESET,
  COLLEGE_LIST_SUCCESS,
  COLLEGE_UPDATE_FAIL,
  COLLEGE_UPDATE_REQUEST,
  COLLEGE_UPDATE_SUCCESS,
} from '../constants/collegeConstant';

const collegeCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case COLLEGE_CREATE_REQUEST:
      return { loading: true };

    case COLLEGE_CREATE_SUCCESS:
      return { loading: false, success: true, collegeId: payload._id };

    case COLLEGE_CREATE_FAIL:
      return { loading: false, error: payload };

    case COLLEGE_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

const collegeListReducer = (
  state = { colleges: [], success: false, search: '' },
  { type, payload }
) => {
  switch (type) {
    case COLLEGE_LIST_REQUEST:
      return { ...state, loading: true };

    case COLLEGE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        page: payload.page,
        pages: payload.pages,
        colleges: payload.colleges,
        success: true,
        search: payload.search,
      };

    case COLLEGE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        success: true,
        error: payload,
      };

    case COLLEGE_LIST_RESET:
      return { success: false, colleges: [], search: '' };

    default:
      return state;
  }
};

const collegeDetailsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case COLLEGE_DETAILS_REQUEST:
      return { loading: true };

    case COLLEGE_DETAILS_FAIL:
      return { loading: false, error: payload };

    case COLLEGE_DETAILS_RESET:
      return {};

    case COLLEGE_DETAILS_SUCCESS:
      return { loading: false, college: payload };

    default:
      return state;
  }
};

const collegeUpdateReducer = (
  state = { success: false },
  { type, payload }
) => {
  switch (type) {
    case COLLEGE_UPDATE_REQUEST:
      return { ...state, loading: true };

    case COLLEGE_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true };

    case COLLEGE_UPDATE_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

const collegeDeleteReducer = (
  state = { success: false },
  { type, payload }
) => {
  switch (type) {
    case COLLEGE_DELETE_REQUEST:
      return { ...state, loading: true };

    case COLLEGE_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };

    case COLLEGE_DELETE_FAIL:
      return { ...state, loading: false, error: payload };

    case COLLEGE_DELETE_RESET:
      return { success: false };

    default:
      return state;
  }
};

export {
  collegeCreateReducer,
  collegeListReducer,
  collegeDetailsReducer,
  collegeDeleteReducer,
  collegeUpdateReducer,
};
