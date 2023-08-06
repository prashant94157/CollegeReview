import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import { userReviewsReducer } from './reducers/reviewReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,

  userReviews: userReviewsReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const userReviewsFromStorage = localStorage.getItem('userReviews')
  ? JSON.parse(localStorage.getItem('userReviews'))
  : { reviews: [] };

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
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
