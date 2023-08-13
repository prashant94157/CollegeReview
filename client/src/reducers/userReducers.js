import {
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_UPDATE_RESET,
} from '../constants/userConstants';

const userLoginReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

const userRegisterReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: payload };

    default:
      return state;
  }
};

const userDetailsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, profile: payload };

    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: payload };

    case USER_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

const userUpdateReducer = (state = { success: false }, { type, payload }) => {
  switch (type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };

    case USER_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true };

    case USER_UPDATE_FAIL:
      return { ...state, loading: false, error: payload };
    case USER_UPDATE_RESET:
      return { success: false };

    default:
      return state;
  }
};

const userDeleteReducer = (state = { success: false }, { type, payload }) => {
  switch (type) {
    case USER_DELETE_REQUEST:
      return { ...state, loading: true };

    case USER_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };

    case USER_DELETE_FAIL:
      return { ...state, loading: false, error: payload };

    case USER_DELETE_RESET:
      return { success: false };

    default:
      return state;
  }
};

const userListReducer = (
  state = { users: [], success: false, search: '' },
  { type, payload }
) => {
  switch (type) {
    case USER_LIST_REQUEST:
      return { ...state, loading: true };

    case USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        page: payload.page,
        pages: payload.pages,
        users: payload.users,
        success: true,
        search: payload.search,
      };

    case USER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        success: true,
        error: payload,
      };

    case USER_LIST_RESET:
      return { success: false, users: [], search: '' };

    default:
      return state;
  }
};

export {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  userDeleteReducer,
  userListReducer,
};
