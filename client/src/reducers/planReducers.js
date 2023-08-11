import {
  PLAN_LIST_FAIL,
  PLAN_LIST_REQUEST,
  PLAN_LIST_SUCCESS,
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

export { planListReducer };
