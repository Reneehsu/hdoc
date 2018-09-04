import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import pageReducer from './pageReducer';
import userReducer from './userReducer';
import docReducer from './docReducer';

const rootReducer = combineReducers({
  page: pageReducer,
  user: userReducer,
  doc: docReducer,
  routing: routerReducer
});

export default rootReducer;
