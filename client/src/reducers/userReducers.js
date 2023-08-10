import {
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_EDIT_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_RESET,
  USER_EDIT_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
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

const userProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_EDIT_REQUEST:
      return { ...state, loading: true };

    case USER_EDIT_SUCCESS:
      return { ...state, loading: false, profile: payload };

    case USER_EDIT_FAIL:
      return { ...state, loading: false, error: payload };

    case USER_EDIT_RESET:
      return {};

    default:
      return state;
  }
};

const profileUpdateReducer = (
  state = { success: false },
  { type, payload }
) => {
  switch (type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };

    case USER_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true };

    case USER_UPDATE_FAIL:
      return { ...state, loading: false, error: payload };

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

export {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  profileUpdateReducer,
  userDeleteReducer,
};
