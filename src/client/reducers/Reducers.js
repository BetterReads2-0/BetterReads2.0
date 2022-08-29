import { combineReducers } from '@reduxjs/toolkit';
import UserReducer from './UserReducers.js';

const reducer = combineReducers({
  user: UserReducer,
});

export default reducer;