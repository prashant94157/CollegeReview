import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
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

export { userLoginReducer, userRegisterReducer };
