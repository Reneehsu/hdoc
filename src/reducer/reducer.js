import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import pageReducer from './pageReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  page: pageReducer,
  user: userReducer,
  routing: routerReducer
});

export default rootReducer;
