import {
  COLLEGE_CREATE_FAIL,
  COLLEGE_CREATE_REQUEST,
  COLLEGE_CREATE_RESET,
  COLLEGE_CREATE_SUCCESS,
  COLLEGE_LIST_FAIL,
  COLLEGE_LIST_REQUEST,
  COLLEGE_LIST_RESET,
  COLLEGE_LIST_SUCCESS,
} from '../constants/collegeConstant';

const collegeCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case COLLEGE_CREATE_REQUEST:
      return { loading: true };

    case COLLEGE_CREATE_SUCCESS:
      return { loading: false, success: true, collegeId: payload._id };

    case COLLEGE_CREATE_FAIL:
      return { loading: false, error: payload };

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

export { collegeCreateReducer, collegeListReducer };
