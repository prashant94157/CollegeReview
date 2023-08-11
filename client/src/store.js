import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userUpdateReducer,
  userDeleteReducer,
  userLoginReducer,
  userDetailsReducer,
  userRegisterReducer,
  userListReducer,
} from './reducers/userReducers';
import {
  reviewCreateReducer,
  reviewDeleteReducer,
  reviewDetailsReducer,
  reviewUpdateReducer,
  userReviewsReducer,
} from './reducers/reviewReducers';
import {
  planCreateReducer,
  planDeleteReducer,
  planDetailsReducer,
  planListReducer,
  planUpdateReducer,
} from './reducers/planReducers';
import {
  collegeCreateReducer,
  collegeListReducer,
  collegeDetailsReducer,
  collegeUpdateReducer,
  collegeDeleteReducer,
} from './reducers/collegeReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userReviews: userReviewsReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,

  reviewUpdate: reviewUpdateReducer,
  reviewDelete: reviewDeleteReducer,
  reviewCreate: reviewCreateReducer,
  reviewDetails: reviewDetailsReducer,

  planList: planListReducer,
  planCreate: planCreateReducer,
  planDetails: planDetailsReducer,
  planUpdate: planUpdateReducer,
  planDelete: planDeleteReducer,

  collegeCreate: collegeCreateReducer,
  collegeList: collegeListReducer,
  collegeDetails: collegeDetailsReducer,
  collegeUpdate: collegeUpdateReducer,
  collegeDelete: collegeDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const userReviewsFromStorage = localStorage.getItem('userReviews')
  ? JSON.parse(localStorage.getItem('userReviews'))
  : { reviews: [], success: false };

const now = new Date();

const planListFromStorage =
  localStorage.getItem('plans') &&
  JSON.parse(localStorage.getItem('plans')).expiry > now.getTime()
    ? JSON.parse(localStorage.getItem('plans'))
    : { plans: [], success: false };

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
  userReviews: {
    reviews: userReviewsFromStorage.reviews,
    page: userReviewsFromStorage.page,
    pages: userReviewsFromStorage.pages,
    success: userReviewsFromStorage.success,
  },
  planList: {
    ...planListFromStorage,
  },
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
