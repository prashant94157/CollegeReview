import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  profileUpdateReducer,
  userDeleteReducer,
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
} from './reducers/userReducers';
import { userReviewsReducer } from './reducers/reviewReducers';
import { planListReducer } from './reducers/planReducers';
import {
  collegeCreateReducer,
  collegeListReducer,
} from './reducers/collegeReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userReviews: userReviewsReducer,
  profileUpdate: profileUpdateReducer,
  userDelete: userDeleteReducer,

  planList: planListReducer,

  collegeCreate: collegeCreateReducer,
  collegeList: collegeListReducer,
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
