import {
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_RESET,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
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
    case USER_PROFILE_REQUEST:
      return { ...state, loading: true };

    case USER_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: payload };

    case USER_PROFILE_FAIL:
      return { ...state, loading: false, error: payload };

    case USER_PROFILE_RESET:
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
    case PROFILE_UPDATE_REQUEST:
      return { ...state, loading: true };

    case PROFILE_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true };

    case PROFILE_UPDATE_FAIL:
      return { ...state, loading: false, error: payload };

    case USER_PROFILE_RESET:
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
};
