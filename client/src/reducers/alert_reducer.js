import { REMOVE_ALERT, REMOVE_ALL_ALERT, SET_ALERT } from '../constants';

const initialState = [];

function alertReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];

    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);

    case REMOVE_ALL_ALERT:
      return initialState;

    default:
      return state;
  }
}

export default alertReducer;
