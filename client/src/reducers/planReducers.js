import {
  PLAN_CREATE_FAIL,
  PLAN_CREATE_REQUEST,
  PLAN_CREATE_RESET,
  PLAN_CREATE_SUCCESS,
  PLAN_DELETE_FAIL,
  PLAN_DELETE_REQUEST,
  PLAN_DELETE_RESET,
  PLAN_DELETE_SUCCESS,
  PLAN_DETAILS_FAIL,
  PLAN_DETAILS_REQUEST,
  PLAN_DETAILS_RESET,
  PLAN_DETAILS_SUCCESS,
  PLAN_LIST_FAIL,
  PLAN_LIST_REQUEST,
  PLAN_LIST_SUCCESS,
  PLAN_UPDATE_FAIL,
  PLAN_UPDATE_REQUEST,
  PLAN_UPDATE_RESET,
  PLAN_UPDATE_SUCCESS,
} from '../constants/planConstant';

const planListReducer = (
  state = { plans: [], success: false },
  { type, payload }
) => {
  switch (type) {
    case PLAN_LIST_REQUEST:
      return { ...state, loading: true };

    case PLAN_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        page: payload.page,
        pages: payload.pages,
        plans: payload.plans,
        success: true,
      };

    case PLAN_LIST_FAIL:
      return {
        ...state,
        loading: false,
        success: true,
        error: payload,
      };

    default:
      return state;
  }
};

const planCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PLAN_CREATE_REQUEST:
      return { loading: true };

    case PLAN_CREATE_SUCCESS:
      return { loading: false, success: true, planId: payload._id };

    case PLAN_CREATE_FAIL:
      return { loading: false, error: payload };

    case PLAN_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

const planDetailsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PLAN_DETAILS_REQUEST:
      return { loading: true };

    case PLAN_DETAILS_FAIL:
      return { loading: false, error: payload };

    case PLAN_DETAILS_RESET:
      return {};

    case PLAN_DETAILS_SUCCESS:
      return { loading: false, plan: payload };

    default:
      return state;
  }
};

const planUpdateReducer = (state = { success: false }, { type, payload }) => {
  switch (type) {
    case PLAN_UPDATE_REQUEST:
      return { ...state, loading: true };

    case PLAN_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true };

    case PLAN_UPDATE_FAIL:
      return { ...state, loading: false, error: payload };

    case PLAN_UPDATE_RESET:
      return { success: false };

    default:
      return state;
  }
};

const planDeleteReducer = (state = { success: false }, { type, payload }) => {
  switch (type) {
    case PLAN_DELETE_REQUEST:
      return { ...state, loading: true };

    case PLAN_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };

    case PLAN_DELETE_FAIL:
      return { ...state, loading: false, error: payload };

    case PLAN_DELETE_RESET:
      return { success: false };

    default:
      return state;
  }
};

export {
  planListReducer,
  planCreateReducer,
  planDetailsReducer,
  planUpdateReducer,
  planDeleteReducer,
};
